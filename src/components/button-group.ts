import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { InputProperties } from './input'
import { findChild, findChildren, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { Button, BUTTON_NAMES, renderButtonChild } from './button'
import { Input, INPUT_NAMES } from './input'

export type ButtonGroupProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Buttons' | 'Input + button'
  '⇅ Orientation': 'Vertical' | 'Horizontal'
}

export function ButtonGroup(component: DesignComponent<ButtonGroupProperties>) {
  const { variant, size, orientation } = cleanPropNames(component.properties)

  const children: DevComponent['children'] = []

  if (variant === 'Buttons') {
    const buttons = findChildren<DesignComponent<ButtonProperties>>(component, {
      type: 'INSTANCE',

      name: BUTTON_NAMES,
    })

    children.push(...buttons.map((button) => renderButtonChild(button)))
  } else {
    const input = queryOne<DesignComponent<InputProperties>>(component, [
      { query: 'child', type: 'INSTANCE', name: 'Input' },
      { query: 'child', type: 'INSTANCE', name: INPUT_NAMES },
    ])
    if (input) {
      children.push(Input(input))
    }

    const button = findChild<DesignComponent<ButtonProperties>>(component, {
      type: 'INSTANCE',
      name: BUTTON_NAMES,
    })
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
