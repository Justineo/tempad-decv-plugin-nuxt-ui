import type { DesignComponent, DevComponent, FrameNode } from '@tempad-dev/plugins'
import type { ContentSearchButtonProperties } from './content-search-button'
import type { PageAnchorsProperties } from './page-anchors'
import { findChild } from '@tempad-dev/plugins'
import { h, renderSlot } from '../utils'
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

  return h('UPageAside', {}, {}, children)
}
