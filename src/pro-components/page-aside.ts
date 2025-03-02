import type { DesignComponent, DevComponent, FrameNode } from '@tempad-dev/plugins'
import type { SeparatorProperties } from '../components/separator'
import type { ContentNavigationProperties } from './content-navigation'
import type { ContentSearchButtonProperties } from './content-search-button'
import type { PageAnchorsProperties } from './page-anchors'
import { findChild } from '@tempad-dev/plugins'
import { Separator } from '../components/separator'
import { h, renderSlot } from '../utils'
import { ContentNavigation } from './content-navigation'
import { ContentSearchButton } from './content-search-button'
import { PageAnchors } from './page-anchors'

// eslint-disable-next-line ts/no-empty-object-type
export type PageAsideProperties = {}

export function PageAside(component: DesignComponent<PageAsideProperties>) {
  const children: DevComponent['children'] = []

  const top = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'Top',
  })

  if (top) {
    const search = findChild<DesignComponent<ContentSearchButtonProperties>>(top, {
      type: 'INSTANCE',
      name: 'ContentSearchButton',
    })
    const anchors = findChild<DesignComponent<PageAnchorsProperties>>(top, {
      type: 'INSTANCE',
      name: 'PageAnchors',
    })
    if (search || anchors) {
      const topSlot = renderSlot('top', [
        ...(search ? [ContentSearchButton(search)] : []),
        ...(anchors ? [PageAnchors(anchors)] : []),
      ])
      children.push(topSlot)
    }
  }

  const sep = findChild<DesignComponent<SeparatorProperties>>(component, {
    type: 'INSTANCE',
    name: 'Separator',
  })
  const nav = findChild<DesignComponent<ContentNavigationProperties>>(component, {
    type: 'INSTANCE',
    name: 'ContentNavigation',
  })
  if (sep || nav) {
    const content = [...(sep ? [Separator(sep)] : []), ...(nav ? [ContentNavigation(nav)] : [])]
    children.push(...content)
  }

  return h('UPageAside', {}, {}, children)
}
