import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { InputProperties } from './input'
import type { InputNumberProperties } from './input-number'
import type { PinInputProperties } from './pin-input'
import { findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { Input, INPUT_NAMES } from './input'
import { InputNumber } from './input-number'
import { PinInput } from './pin-input'

export type FormFieldProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Input': 'Input' | 'InputNumber' | 'PinInput'
  '👁️ Error': 'False' | 'True'
  '𝐓 Label': string
  '👁️ Required': boolean
  '👁️ Hint': boolean
  '↳ HintSlot'?: string
  '👁️ Help': boolean
  '↳ HelpSlot': string
  '👁️ Description': boolean
  '↳ DescriptionSlot': string
}

export function FormField(component: DesignComponent<FormFieldProperties>) {
  const { properties } = component

  const {
    size,
    input,
    error,
    label,
    required,
    hint,
    hintSlot,
    help,
    helpSlot,
    description,
    descriptionSlot,
  } = cleanPropNames(properties)

  const children: DevComponent['children'] = []

  if (input === 'Input') {
    const i = findOne<DesignComponent<InputProperties>>(component, {
      type: 'INSTANCE',
      name: INPUT_NAMES,
      visible: true,
    })

    if (i) {
      children.push(Input(i))
    }
  } else if (input === 'InputNumber') {
    const i = findOne<DesignComponent<InputNumberProperties>>(component, {
      type: 'INSTANCE',
      name: 'InputNumber',
      visible: true,
    })

    if (i) {
      children.push(InputNumber(i))
    }
  } else if (input === 'PinInput') {
    const i = findOne<DesignComponent<PinInputProperties>>(component, {
      type: 'INSTANCE',
      name: 'PinInput',
      visible: true,
    })

    if (i) {
      children.push(PinInput(i))
    }
  }

  return h(
    'UFormField',
    {
      label,
      description: (description && descriptionSlot) || undefined,
      help: (help && helpSlot) || undefined,
      error: error === 'True' ? helpSlot || true : false,
      hint: (hint && hintSlot) || undefined,
      size,
      required,
    },
    {
      error: false,
      size: 'md',
      required: false,
    },
    children,
  )
}
