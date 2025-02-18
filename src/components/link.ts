import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type LinkProperties = {
  '𝐓 Label': string
  '🎨 Color': 'Neutral' | 'Primary'
  '🚦 State': 'Default' | 'Disabled' | 'Hover'
}

export function Link(component: DesignComponent<LinkProperties>) {
  const { color, state, label } = cleanPropNames(component.properties)

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
