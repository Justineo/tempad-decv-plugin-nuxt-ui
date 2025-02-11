import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'

export type InputNumberProperties = {
  '🎨 Color': 'Neutral' | 'Primary' | 'Error'
  '◆ Variant': 'Ghost' | 'None' | 'Outline' | 'Soft' | 'Subtle'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '🚦 State': 'Default' | 'Focus (or hover)' | 'Disabled'
  '✧ Highlight': 'False' | 'True'
  '👁️ Placeholder': boolean
  '↳ PlaceholderText'?: string
  '👁️ Completed': boolean
  '↳ CompletedText'?: string
}

export function InputNumber(component: DesignComponent<InputNumberProperties>) {
  const { properties } = component

  const {
    color,
    variant,
    size,
    orientation,
    state,
    highlight,
    placeholder,
    placeholderText,
  } = cleanPropNames(properties)

  const buttons = findChildren<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
    visible: true,
  })

  const [dec, inc] = buttons.map((button) =>
    renderButtonItem(button, {
      variant: 'link',
      square: true,
    }),
  )

  const { icon: decrementIcon, ...decrement } = dec
  const { icon: incrementIcon, ...increment } = inc

  return h(
    'UInputNumber',
    {
      placeholder: (placeholder && placeholderText) || undefined,
      color: toLowerCase(color),
      variant: toLowerCase(variant),
      size,
      highlight: highlight === 'True',
      orientation: toLowerCase(orientation),
      increment,
      incrementIcon,
      decrement,
      decrementIcon,
      disabled: state === 'Disabled',
    },
    {
      color: 'primary',
      variant: 'outline',
      size: 'md',
      highlight: false,
      orientation: 'horizontal',
      incrementIcon: ui.icons.plus,
      decrementIcon: ui.icons.minus,
      disabled: false,
    },
  )
}
