import type { PageLink } from '@nuxt/ui-pro/runtime/components/PageLinks.vue'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from '../components/icon'
import { queryAll } from '@tempad-dev/plugins'
import { getIconName } from '../components/icon'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h } from '../utils'

export type PageLinksItemProperties = {
  '𝐓 Label': string
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '🙂 IconLeading': boolean
  '👁️ External': boolean
}

export function renderPageLinksItem(item: DesignComponent<PageLinksItemProperties>): PageLink {
  const { label, external, iconLeading, iconLeadingName } = cleanPropNames(item.properties)

  return {
    label,
    icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
    external,
    to: getLinkTo(label, external ? 'external' : 'path'),
  }
}

export type PageLinksProperties = {
  '↳ Title': string
  '👁️ Title': boolean
}

export function PageLinks(component: DesignComponent<PageLinksProperties>) {
  const { title, showTitle } = cleanPropNames(component.properties, {
    '👁️ Title': 'showTitle',
  })

  const links = queryAll<DesignComponent<PageLinksItemProperties>>(component, [
    { query: 'one', type: 'FRAME', name: 'Links' },
    { query: 'children', type: 'INSTANCE', name: 'PageLinksItem' },
  ]).map(renderPageLinksItem)

  return h(
    'UPageLinks',
    {
      title: (showTitle && title) || undefined,
      links,
    },
    {},
  )
}
