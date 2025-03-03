import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from '../components/icon'
import type { PageFeatureProps } from '../types'
import { getIconName } from '../components/icon'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type PageFeatureProperties = {
  '👁️ Description': boolean
  '↳ Description': string
  '𝐓 Title': string
  '↳ IconName': DesignComponent<IconProperties>
  '👁️ Icon': boolean
  '⇅ Orientation': 'Horizontal' | 'Vertical'
}

export function PageFeature(component: DesignComponent<PageFeatureProperties>) {
  const { showDescription, description, title, iconName, icon, orientation } = cleanPropNames(component.properties, {
    '👁️ Description': 'showDescription',
  })

  return h(
    'UPageFeature',
    {
      icon: icon ? getIconName(iconName.name) : undefined,
      title,
      description: (showDescription && description) || undefined,
      orientation: toLowerCase(orientation),
    },
    {
      orientation: 'horizontal',
    },
  )
}

export function renderPageFeatureItem(feature: DesignComponent<PageFeatureProperties>): PageFeatureProps {
  return PageFeature(feature).props
}
