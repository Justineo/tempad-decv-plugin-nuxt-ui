import type { ContentTocLink } from '@nuxt/ui-pro/runtime/components/content/ContentToc.vue'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { ContentTocProps } from '../types'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChild, queryAll } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pickOverrides, toKebabCase, toLowerCase } from '../utils'

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

  // TODO: PageLinks in the `bottom` slot are not supported yet.

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
  )
}
