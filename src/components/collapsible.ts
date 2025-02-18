import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChild } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { Button, BUTTON_NAMES } from './button'

export type CollapsibleProperties = {
  '❖ Slot': DesignComponent
  '👁️ Open': boolean
  '◆ Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function Collapsible(component: DesignComponent<CollapsibleProperties>) {
  const { open } = cleanPropNames(component.properties)

  const button = findChild<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
  })

  return h(
    'UCollapsible',
    {
      open,
    },
    {
      open: false,
    },
    button ? [Button(button)] : [],
  )
}
