import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { BadgeProperties } from '../components/badge'
import type { ButtonProperties } from '../components/button'
import { queryAll, queryOne } from '@tempad-dev/plugins'
import { Badge } from '../components/badge'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h, LOREM_IPSUM_TEXT, renderSlot, toLowerCase } from '../utils'

export type PageHeroProperties = {
  '↳ Slot': DesignComponent
  '👁️ Slot': boolean
  '↳ Description': string
  '𝐓 Title': string
  '👁️ Links': boolean
  '👁️ Description': boolean
  '👁️ Headline': boolean
  '⇅ Orientation': 'Vertical' | 'Horizontal'
  '🖥️ Device': 'Desktop' | 'Mobile'
}

export function PageHero(component: DesignComponent<PageHeroProperties>) {
  const {
    title,
    showDescription,
    description,
    headline: showHeadline,
    showSlot,
    links: showLinks,
    orientation,
  } = cleanPropNames(component.properties, {
    '👁️ Slot': 'showSlot',
    '👁️ Description': 'showDescription',
  })

  const links = queryAll<DesignComponent<ButtonProperties>>(component, [
    { query: 'one', type: 'FRAME', name: 'Links' },
    { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
  ])
    .map((button) => renderButtonItem(button, { size: 'xl' }))
    .map((link) => ({
      ...link,
      to: getLinkTo(link.label || ''),
    }))

  const children: DevComponent['children'] = []

  if (showHeadline) {
    const badge = queryOne<DesignComponent<BadgeProperties>>(component, [
      { query: 'one', type: 'FRAME', name: 'Top' },
      { query: 'one', type: 'INSTANCE', name: 'Badge' },
    ])
    if (badge) {
      children.push(renderSlot('headline', [Badge(badge)]))
    }
  }

  if (showSlot) {
    children.push(LOREM_IPSUM_TEXT)
  }

  return h(
    'UPageHero',
    {
      // Headline doesn't support text content yet.
      // headline: (showHeadline && headline) || undefined,
      title,
      description: (showDescription && description) || undefined,
      links: showLinks ? links : undefined,
      orientation: toLowerCase(orientation),
    },
    {
      orientation: 'vertical',
    },
    children,
  )
}
