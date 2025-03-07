import type { PageAnchor } from '@nuxt/ui-pro/runtime/components/PageAnchors.vue'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from '../components/icon'
import { findChildren } from '@tempad-dev/plugins'
import { getIconName } from '../components/icon'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h } from '../utils'

export type PageAnchorsItemProperties = {
  '𝐓 Label': string
  '👁️ External': boolean
  '🙂 IconLeadingName': DesignComponent<IconProperties>
  '🚦 State': 'Default' | 'Hover' | 'Active'
}

export function renderPageAnchorsItem(item: DesignComponent<PageAnchorsItemProperties>): PageAnchor {
  const { label, external, iconLeadingName } = cleanPropNames(item.properties)

  return {
    label,
    icon: iconLeadingName ? getIconName(iconLeadingName.name) : undefined,
    external,
    to: getLinkTo(label, external ? 'external' : 'hash'),
  }
}

// eslint-disable-next-line ts/no-empty-object-type
export type PageAnchorsProperties = {}

export function PageAnchors(component: DesignComponent<PageAnchorsProperties>) {
  const links = findChildren<DesignComponent<PageAnchorsItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'PageAnchorsItem',
  }).map((item) => renderPageAnchorsItem(item))

  return h(
    'UPageAnchors',
    {
      links,
    },
    {},
  )
}
