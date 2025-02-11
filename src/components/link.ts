import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type LinkProperties = {
  '🎨 Color': 'Neutral' | 'Primary'
  '🚦 State': 'Default' | 'Disabled' | 'Hover'
  '𝐓 Label': string
}

export function Link(component: DesignComponent<LinkProperties>) {
  const { properties } = component

  const { color, state, label } = cleanPropNames(properties)

  return h(
    'ULink',
    {
      active: toLowerCase(color) === 'primary',
      disabled: state === 'Disabled',
    },
    {
      active: false,
      disabled: false,
    },
    [label],
  )
}
