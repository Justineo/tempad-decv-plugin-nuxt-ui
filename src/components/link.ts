import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toKebabCase, toLowerCase } from '../utils'

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

export function getLinkTo(label: string, type: 'path' | 'external' | 'hash' = 'path') {
  const path = toKebabCase(label)

  switch (type) {
    case 'external':
      return `https://example.com/${path}`
    case 'hash':
      return `#${path}`
    default:
      return `/${path}`
  }
}
