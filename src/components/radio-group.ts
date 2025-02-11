import type { RadioGroupItem, RadioGroupProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pick, toLowerCase } from '../utils'

export type RadioProperties = {
  '🎨 Color':
    | 'Neutral'
    | 'Error'
    | 'Primary'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled' | 'Focus' | 'Selected'
  '𝐓 Label': string
  '👁️ Description': boolean
  '↳ DescriptionSlot'?: string
}

type RadioGroupItemExtra = Pick<RadioGroupProps<RadioGroupItem>, 'color'>

export function renderRadioItem(
  item: DesignComponent<RadioProperties>,
): RadioGroupItem & RadioGroupItemExtra {
  const { properties } = item

  const { color, state, label, description, descriptionSlot } =
    cleanPropNames(properties)

  return pick(
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
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Align': 'Horizontal' | 'Vertical'
  '𝐓 Legend': string
  '👁️ Required': boolean
}

export function RadioGroup(component: DesignComponent<RadioGroupProperties>) {
  const { properties } = component

  const { size, align, legend, required } = cleanPropNames(properties)

  const items = findAll<DesignComponent<RadioProperties>>(component, {
    type: 'INSTANCE',
    name: 'Radio',
    visible: true,
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
