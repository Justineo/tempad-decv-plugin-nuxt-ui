import type { DesignComponent, TextNode } from '@tempad-dev/plugins'
import type { ButtonProps } from '../types'
import type { IconProperties } from './icon'
import { findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, pickOverrides, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { getIconName } from './icon'

const BUTTON_COLOR_MAP: Record<string, ButtonProps['color']> = {
  ButtonPrimary: 'primary',
  ButtonSecondary: 'secondary',
  ButtonSuccess: 'success',
  ButtonInfo: 'info',
  ButtonWarning: 'warning',
  ButtonError: 'error',
  ButtonNeutral: 'neutral',
}

type ButtonName = keyof typeof BUTTON_COLOR_MAP

export const BUTTON_NAMES = Object.keys(BUTTON_COLOR_MAP) as ButtonName[]

export type ButtonProperties = {
  '👁️ Label': boolean
  '👁️ AvatarTrailing': boolean
  '↳ IconTrailingName': DesignComponent<IconProperties>
  '👁️ IconTrailing': boolean
  '👁️ AvatarLeading': boolean
  '👁️ IconLeading': boolean
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '𝐓 LabelSlot': string
  '◆ Variant': 'Solid' | 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'Link'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled' | 'Focus' | 'Hover'
  '◆ Slot': 'Icon' | 'Avatar'
  '👁️ Square': 'False' | 'True'
}

export function Button(component: DesignComponent<ButtonProperties>, defaults: Partial<ButtonProps> = {}) {
  const {
    variant,
    size,
    state,
    square,
    slot,
    iconLeading,
    iconLeadingName,
    iconTrailing,
    iconTrailingName,
    avatarLeading,
  } = cleanPropNames(component.properties)

  const color = BUTTON_COLOR_MAP[component.name]

  const icon = slot === 'Icon' && iconLeading ? getIconName(iconLeadingName.name) : undefined
  const trailingIcon = iconTrailing ? getIconName(iconTrailingName.name) : undefined
  const avatar = slot === 'Avatar' && avatarLeading ? getRandomAvatar() : undefined

  const label = findOne<TextNode>(component, {
    type: 'TEXT',
  })?.characters

  return h(
    'UButton',
    {
      variant: toLowerCase(variant),
      color,
      size,
      square: square === 'True',
      icon,
      trailingIcon,
      avatar,
      disabled: state === 'Disabled',
    },
    {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      square: false,
      disabled: false,
      ...defaults,
    },
    label ? [label] : [],
  )
}

export function renderButtonItem(
  button: DesignComponent<ButtonProperties>,
  defaults: Partial<ButtonProps> = {},
): Partial<ButtonProps> {
  const { props, children } = Button(button)
  const label = children
    .map((child) => (typeof child === 'string' ? child : undefined))
    .filter(Boolean)
    .join('')

  return pickOverrides(
    {
      ...(label ? { label } : {}),
      ...props,
    },
    defaults,
  )
}

export function renderButtonChild(button: DesignComponent<ButtonProperties>) {
  const {
    props: { size, ...rest },
    children,
  } = Button(button)

  return h('UButton', rest, {}, children)
}
