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
  '👁️ Description': boolean
  '👁️ Help': boolean
  '👁️ Hint': boolean
  '👁️ Required': boolean
  '↳ HintSlot': string
  '↳ DescriptionSlot': string
  '↳ HelpSlot': string
  '𝐓 Label': string
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Input': 'Input' | 'InputNumber' | 'PinInput'
  '👁️ Error': 'False' | 'True'
}

export function FormField(component: DesignComponent<FormFieldProperties>) {
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
  } = cleanPropNames(component.properties)

  const children: DevComponent['children'] = []

  if (input === 'Input') {
    const i = findOne<DesignComponent<InputProperties>>(component, {
      type: 'INSTANCE',
      name: INPUT_NAMES,
    })

    if (i) {
      children.push(Input(i))
    }
  } else if (input === 'InputNumber') {
    const i = findOne<DesignComponent<InputNumberProperties>>(component, {
      type: 'INSTANCE',
      name: 'InputNumber',
    })

    if (i) {
      children.push(InputNumber(i))
    }
  } else if (input === 'PinInput') {
    const i = findOne<DesignComponent<PinInputProperties>>(component, {
      type: 'INSTANCE',
      name: 'PinInput',
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
      help: (error === 'False' && help && helpSlot) || undefined,
      error: error === 'True' && (helpSlot || true),
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
