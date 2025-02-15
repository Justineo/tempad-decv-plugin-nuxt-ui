import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { InputProperties } from './input'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { Button, BUTTON_NAMES, renderButtonChild } from './button'
import { Input, INPUT_NAMES } from './input'

export type ButtonGroupProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Buttons' | 'Input + button'
  '⇅ Orientation': 'Vertical' | 'Horizontal'
}

export function ButtonGroup(component: DesignComponent<ButtonGroupProperties>) {
  const { properties } = component

  const { variant, size, orientation } = cleanPropNames(properties)

  const children: DevComponent['children'] = []

  if (variant === 'Buttons') {
    const buttons = findChildren<DesignComponent<ButtonProperties>>(component, {
      type: 'INSTANCE',
      visible: true,
      name: BUTTON_NAMES,
    })

    children.push(...buttons.map((button) => renderButtonChild(button)))
  } else {
    const input = findChild<DesignComponent<InputProperties>>(component, {
      type: 'INSTANCE',
      name: INPUT_NAMES,
      visible: true,
    })
    const button = findChild<DesignComponent<ButtonProperties>>(component, {
      type: 'INSTANCE',
      name: BUTTON_NAMES,
      visible: true,
    })
    if (input) {
      children.push(Input(input))
    }
    if (button) {
      children.push(Button(button))
    }
  }

  return h(
    'UButtonGroup',
    {
      size,
      orientation: toLowerCase(orientation),
    },
    {
      size: 'md',
      orientation: 'horizontal',
    },
    children,
  )
}
