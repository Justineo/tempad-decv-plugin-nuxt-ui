import type { ContentSurroundLink } from '@nuxt/ui-pro/runtime/components/content/ContentSurround.vue'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from '../components/icon'
import { findChildren, queryOne } from '@tempad-dev/plugins'
import { ui } from '../components/config'
import { getIconName } from '../components/icon'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h } from '../utils'

export type ContentSurroundItemProperties = {
  '𝐓 Description': string
  '𝐓 Title': string
  '⇅ Align': 'Left' | 'Right'
  '🚦State': 'Default' | 'Focus' | 'Hover'
}

export function renderContentSurroundLink(
  component: DesignComponent<ContentSurroundItemProperties>,
): ContentSurroundLink {
  const { title, description } = cleanPropNames(component.properties)

  const iconNode = queryOne<DesignComponent<IconProperties>>(component, [
    { query: 'child', type: 'FRAME', name: 'Icon' },
    { query: 'child', type: 'INSTANCE' },
  ])

  const icon = iconNode ? getIconName(iconNode.name) : undefined

  return {
    title,
    description,
    path: getLinkTo(title, 'hash'),
    icon,
  }
}

// eslint-disable-next-line ts/no-empty-object-type
export type ContentSurroundProperties = {}

export function ContentSurround(component: DesignComponent<ContentSurroundProperties>) {
  const links = findChildren<DesignComponent<ContentSurroundItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'ContentSurroundItem',
  }).map((item) => renderContentSurroundLink(item))

  const { icon: prevIcon, ...prev } = links[0]!
  const { icon: nextIcon, ...next } = links[1]!

  return h(
    'UContentSurround',
    {
      prevIcon,
      nextIcon,
      surround: [prev, next],
    },
    {
      prevIcon: ui.icons.arrowLeft,
      nextIcon: ui.icons.arrowRight,
    },
  )
}
