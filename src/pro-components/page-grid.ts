import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { PageCardProperties } from './page-card'
import type { PageFeatureProperties } from './page-feature'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { PageCard } from './page-card'
import { PageFeature } from './page-feature'

export type PageGridProperties = {
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '◆ Variant': 'Card' | 'Feature'
}

export function PageGrid(component: DesignComponent<PageGridProperties>) {
  const { variant } = cleanPropNames(component.properties)

  const children: DevComponent['children'] = []

  if (variant === 'Card') {
    children.push(
      ...findAll<DesignComponent<PageCardProperties>>(component, {
        type: 'INSTANCE',
        name: 'PageCard',
      }).map(PageCard),
    )
  } else if (variant === 'Feature') {
    children.push(
      ...findAll<DesignComponent<PageFeatureProperties>>(component, {
        type: 'INSTANCE',
        name: 'PageFeature',
      }).map(PageFeature),
    )
  }

  return h('UPageGrid', {}, {}, children)
}
