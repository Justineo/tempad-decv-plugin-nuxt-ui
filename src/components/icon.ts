import type { DesignComponent } from '@tempad-dev/plugins'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type IconProperties = {}

export function Icon(component: DesignComponent<IconProperties>) {
  return h(
    'UIcon',
    {
      name: getIconName(component.name),
    },
    {},
  )
}

// close -> i-lucide-close
// simple-icons/x -> i-simple-icons-x
export function getIconName(name?: string): string | undefined {
  if (!name) {
    return undefined
  }

  if (name.includes('/')) {
    const [prefix, iconName] = name.split('/')
    return `i-${prefix}-${iconName}`
  }

  return `i-lucide-${name}`
}
