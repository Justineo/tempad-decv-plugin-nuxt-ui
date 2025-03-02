import type { DesignComponent } from '@tempad-dev/plugins'
import type { PageCardProperties } from './page-card'
import { findAll } from '@tempad-dev/plugins'
import { h } from '../utils'
import { PageCard } from './page-card'

export type PageColumnsProperties = {
  '🖥️ Device': 'Desktop' | 'Mobile'
}

export function PageColumns(component: DesignComponent<PageColumnsProperties>) {
  const cards = findAll<DesignComponent<PageCardProperties>>(component, {
    type: 'INSTANCE',
    name: 'PageCard',
  }).map(PageCard)

  return h('UPageColumns', {}, {}, cards)
}
