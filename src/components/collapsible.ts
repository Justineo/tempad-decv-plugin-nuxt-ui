import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { cleanPropNames, h } from '../utils'
import { Button } from './button'

export type CollapsibleProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '👁️ Open': boolean
}

export function Collapsible(component: DesignComponent<CollapsibleProperties>) {
  const { properties } = component

  const { open } = cleanPropNames(properties)

  const button = component.children[0] as DesignComponent<ButtonProperties>

  return h(
    'UCollapsible',
    {
      open,
    },
    {
      open: false,
    },
    [Button(button)],
  )
}
