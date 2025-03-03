import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { IconProperties } from '../components/icon'
import type { PageFeatureProperties } from './page-feature'
import { queryAll } from '@tempad-dev/plugins'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { getIconName } from '../components/icon'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h, LOREM_IPSUM_TEXT, toLowerCase } from '../utils'
import { renderPageFeatureItem } from './page-feature'

export type PageSectionProperties = {
  '👁️ Icon': boolean
  '👁️ Links': boolean
  '👁️ Features': boolean
  '👁️ Headline': boolean
  '𝐓 Title': string
  '↳ Headline': string
  '↳ IconName': DesignComponent<IconProperties>
  '👁️ Slot': boolean
  '↳ Slot': DesignComponent
  '𝐓 Description': string
  '🖥️ Device': 'Desktop' | 'Mobile'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '👁️ Reverse': 'False' | 'True'
}

export function PageSection(component: DesignComponent<PageSectionProperties>) {
  const {
    title,
    description,
    icon: showIcon,
    iconName,
    links: showLinks,
    features: showFeatures,
    showHeadline,
    headline,
    showSlot,
    orientation,
    reverse,
  } = cleanPropNames(component.properties, {
    '👁️ Headline': 'showHeadline',
    '👁️ Slot': 'showSlot',
  })

  const links = showLinks
    ? queryAll<DesignComponent<ButtonProperties>>(component, [
        { query: 'one', type: 'FRAME', name: 'Links' },
        { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
      ])
        .map((button) => renderButtonItem(button, { size: 'lg' }))
        .map((link) => ({
          ...link,
          to: getLinkTo(link.label || ''),
        }))
    : undefined

  const features = showFeatures
    ? queryAll<DesignComponent<PageFeatureProperties>>(component, [
        { query: 'one', type: 'FRAME', name: 'Features' },
        { query: 'all', type: 'INSTANCE', name: 'PageFeature' },
      ]).map((item) => renderPageFeatureItem(item))
    : undefined

  return h(
    'UPageSection',
    {
      icon: showIcon ? getIconName(iconName.name) : undefined,
      headline: (showHeadline && headline) || undefined,
      title,
      description,
      links,
      features,
      orientation: toLowerCase(orientation),
      reverse: reverse === 'True',
    },
    {
      orientation: 'vertical',
      reverse: false,
    },
    showSlot ? [LOREM_IPSUM_TEXT] : [],
  )
}
