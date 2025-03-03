import type { ContentTocLink } from '@nuxt/ui-pro/runtime/components/content/ContentToc.vue'
import type { DesignComponent, DevComponent, FrameNode } from '@tempad-dev/plugins'
import type { SeparatorProperties } from '../components/separator'
import type { ContentTocProps } from '../types'
import type { PageLinksProperties } from './page-links'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChild, queryAll } from '@tempad-dev/plugins'
import { Separator } from '../components/separator'
import { cleanPropNames, getFirst, h, pickOverrides, renderSlot, toKebabCase, toLowerCase } from '../utils'
import { PageLinks } from './page-links'

export type ContentTocLinkProperties = {
  '𝐓 Label ': string
  '🚦State': 'Active' | 'Default' | 'Hover'
  '🎨 HighlightColor': 'Neutral' | 'Primary'
}

export function renderContentTocLink(
  item: DesignComponent<ContentTocLinkProperties>,
): ContentTocLink & Pick<ContentTocProps, 'highlightColor'> {
  const { label, highlightColor } = cleanPropNames(item.properties)

  return {
    id: toKebabCase(label),
    text: label,
    depth: 3,
    ...pickOverrides(
      {
        // These should be omitted in final `links`
        highlightColor: toLowerCase(highlightColor),
      },
      {
        highlightColor: 'primary',
      },
    ),
  }
}

export type ContentTocItemProperties = {
  '🎨 Color': 'Neutral' | 'Primary'
  '👁️ Children': 'True' | 'False'
}

export function renderContentTocItem(
  item: DesignComponent<ContentTocItemProperties>,
): ContentTocLink & Pick<ContentTocProps, 'color' | 'highlightColor'> {
  const { color } = cleanPropNames(item.properties)

  const link = findChild<DesignComponent<ContentTocLinkProperties>>(item, {
    type: 'INSTANCE',
    name: 'ContentTocLink',
  })

  const { id, text, highlightColor } = link ? renderContentTocLink(link) : {}

  const children = queryAll<DesignComponent<ContentTocLinkProperties>>(item, [
    { query: 'child', type: 'FRAME', name: 'ContentTocList' },
    { query: 'children', type: 'INSTANCE', name: 'ContentTocLink' },
  ]).map(renderContentTocLink)

  const linkHighlightColor = getFirst(children, 'highlightColor')

  return {
    id: id || 'label',
    text: text || 'Label',
    depth: 2,
    children: children.map((child) => omit(child, 'highlightColor')),
    // These should be omitted in final `links`
    ...pickOverrides(
      {
        color: toLowerCase(color),
        highlightColor: linkHighlightColor || highlightColor,
      },
      {
        color: 'primary',
        highlightColor: 'primary',
      },
    ),
  }
}

export type ContentTocProperties = {
  '𝐓 Title': string
  '🖥️ Breakpoint': 'Desktop' | 'Mobile'
}

export function ContentToc(component: DesignComponent<ContentTocProperties>) {
  const { title } = cleanPropNames(component.properties)

  const links = findAll<DesignComponent<ContentTocItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'ContentTocItem',
  }).map(renderContentTocItem)

  const color = getFirst(links, 'color')
  const highlightColor = getFirst(links, 'highlightColor')

  const children: DevComponent['children'] = []

  const bottom = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'Bottom',
  })
  if (bottom) {
    const sep = findChild<DesignComponent<SeparatorProperties>>(bottom, {
      type: 'INSTANCE',
      name: 'Separator',
    })
    const links = findChild<DesignComponent<PageLinksProperties>>(bottom, {
      type: 'INSTANCE',
      name: 'PageLinks',
    })
    if (sep || links) {
      const content = [...(sep ? [Separator(sep)] : []), ...(links ? [PageLinks(links)] : [])]
      children.push(renderSlot('bottom', content))
    }
  }

  // `highlightColor` is calculated from children but is not used here as
  // the Figma component does not have a `Highlight` property yet.
  return h(
    'UContentToc',
    {
      title,
      links: links.map((link) => omit(link, 'color', 'highlightColor')),
      color,
      highlightColor,
    },
    {
      title: 'On this page',
      color: 'primary',
      highlightColor: 'primary',
    },
    children,
  )
}
