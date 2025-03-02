import type { RadioGroupItem } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { RadioGroupProps } from '../types'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pickOverrides, toLowerCase } from '../utils'

export type RadioProperties = {
  '𝐓 Label': string
  '👁️ Description': boolean
  '↳ DescriptionSlot': string
  '🎨 Color': 'Neutral' | 'Error' | 'Primary' | 'Secondary' | 'Success' | 'Info' | 'Warning'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled' | 'Focus' | 'Selected'
}

type RadioGroupItemExtra = Pick<RadioGroupProps, 'color'>

export function renderRadioItem(item: DesignComponent<RadioProperties>): RadioGroupItem & RadioGroupItemExtra {
  const { color, state, label, description, descriptionSlot } = cleanPropNames(item.properties)

  return pickOverrides(
    {
      label,
      description: (description && descriptionSlot) || undefined,
      disabled: state === 'Disabled',
      // These should be omitted in final `items`
      color: toLowerCase(color),
    },
    {
      color: 'primary',
      disabled: false,
    },
  )
}

export type RadioGroupProperties = {
  '𝐓 Legend': string
  '👁️ Required': boolean
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Align': 'Horizontal' | 'Vertical'
}

export function RadioGroup(component: DesignComponent<RadioGroupProperties>) {
  const { size, align, legend, required } = cleanPropNames(component.properties)

  const items = findAll<DesignComponent<RadioProperties>>(component, {
    type: 'INSTANCE',
    name: 'Radio',
  }).map(renderRadioItem)

  const color = getFirst(items, 'color')

  const disabled = items.every((item) => item.disabled)
  if (disabled) {
    items.forEach((item) => {
      delete item.disabled
    })
  }

  return h(
    'URadioGroup',
    {
      legend,
      items,
      size,
      color,
      orientation: toLowerCase(align),
      disabled,
      required,
    },
    {
      size: 'md',
      color: 'primary',
      orientation: 'horizontal',
      disabled: false,
      required: false,
    },
  )
}
