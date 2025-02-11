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

export function getIconName(name?: string): string | undefined {
  if (!name) {
    return undefined
  }

  return `i-lucide-${name}`
}
