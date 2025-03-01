import type { DesignComponent } from '@tempad-dev/plugins'
import type { PinInputProps } from '../types'
import { findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type PinInputItemProperties = {
  '👁️ Completed': boolean
  '↳ CompletedText': string
  '👁️ Placeholder': boolean
  '👁️ Mask': boolean
  '↳ PlaceholderText': string
  '🎨 Color': 'Neutral' | 'Primary' | 'Error'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'None'
  '🚦State': 'Default' | 'Disabled' | 'Focus (or hover)'
  '✧  Highlight': 'False' | 'True'
}

type PinInputItem = Pick<
  PinInputProps,
  'color' | 'variant' | 'size' | 'highlight' | 'type' | 'disabled' | 'placeholder' | 'mask'
> & { value?: string }

export function renderPinInputItem(item: DesignComponent<PinInputItemProperties>): PinInputItem {
  const { color, variant, state, highlight, placeholder, placeholderText, completed, completedText, mask } =
    cleanPropNames(item.properties)

  return {
    color: toLowerCase(color),
    variant: toLowerCase(variant),
    highlight: highlight === 'True',
    disabled: state === 'Disabled',
    placeholder: (placeholder && placeholderText) || undefined,
    value: (completed && completedText) || undefined,
    mask,
  }
}

export type PinInputProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function PinInput(component: DesignComponent<PinInputProperties>) {
  const items: PinInputItem[] = findChildren<DesignComponent<PinInputItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'PinInputItem',
  }).map(renderPinInputItem)

  const type: PinInputProps['type'] = items.some((item) => item.value && !/^\d$/.test(item.value)) ? 'text' : 'number'

  const placeholder: PinInputProps['placeholder'] = items.find((item) => !!item.placeholder)?.placeholder
  const mask: PinInputProps['mask'] = items.some((item) => item.mask)

  const { size } = cleanPropNames(component.properties)
  const { color, variant, highlight, disabled } = items[0]!

  return h(
    'UPinInput',
    {
      color,
      variant,
      size,
      length: items.length,
      highlight,
      type,
      disabled,
      placeholder,
      mask,
    },
    {
      color: 'primary',
      variant: 'outline',
      size: 'md',
      length: 5,
      highlight: false,
      type: 'text',
      disabled: false,
      mask: false,
    },
  )
}
