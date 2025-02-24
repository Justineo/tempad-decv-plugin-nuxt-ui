import type { ContentNavigationLink } from '@nuxt/ui-pro/runtime/components/content/ContentNavigation.vue'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { BadgeProperties } from '../components/badge'
import type { IconProperties } from '../components/icon'
import type { ContentNavigationProps } from '../types'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChild, findChildren } from '@tempad-dev/plugins'
import { renderBadgeItem } from '../components/badge'
import { ui } from '../components/config'
import { getIconName } from '../components/icon'
import { cleanPropNames, getFirst, h, pick, toKebabCase, toLowerCase } from '../utils'

type ContentNavigationItemExtra = Pick<
  ContentNavigationProps,
  'color' | 'highlight' | 'highlightColor' | 'variant' | 'trailingIcon'
>

export type ContentNavigationLinkProperties = {
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '𝐓 Label': string
  '👁️ Badge': boolean
  '👁️ IconTrailing': boolean
  '👁️ IconLeading': boolean
  '🎨 Color': 'Neutral' | 'Primary'
  '◆ Variant': 'Link' | 'Pill'
  '🚦 State': 'Default' | 'Hover' | 'Disabled' | 'Focus'
  '👁️ Active': 'False' | 'True'
  '👁️ Highlight': 'False' | 'True'
  '👁️ External': 'False' | 'True'
}

export function renderContentNavigationLink(
  item: DesignComponent<ContentNavigationLinkProperties>,
): ContentNavigationLink & ContentNavigationItemExtra {
  const {
    iconLeading,
    iconLeadingName,
    badge: showBadge,
    label,
    color,
    variant,
    state,
    active,
    highlight,
  } = cleanPropNames(item.properties)

  const badgeNode = showBadge
    ? findChild<DesignComponent<BadgeProperties>>(item, {
        type: 'INSTANCE',
        name: 'Badge',
      })
    : undefined

  const badge = badgeNode ? renderBadgeItem(badgeNode, { color: 'neutral', variant: 'outline', size: 'sm' }) : undefined

  return {
    title: label,
    path: `#${toKebabCase(label)}`,
    ...pick(
      {
        icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
        badge,
        active: active === 'True',
        disabled: state === 'Disabled',
        // These should be omitted in final `navigation`
        color: toLowerCase(color),
        variant: toLowerCase(variant),
        highlight: highlight === 'True',
      },
      {
        active: false,
        disabled: false,
        color: 'primary',
        variant: 'pill',
        highlight: false,
      },
    ),
  }
}

export type ContentNavigationItemProperties = {
  '👁️ IconTrailing': boolean
  '👁️ Badge': boolean
  '👁️ IconLeading': boolean
  '𝐓 Label': string
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '👁️ Active': 'True' | 'False'
  '🚦State': 'Default' | 'Focus' | 'Hover'
  '🎨 HighlightColor': 'Neutral' | 'Primary'
  '◆ Variant': 'Link' | 'Pill'
}

export function renderContentNavigationItem(
  item: DesignComponent<ContentNavigationItemProperties>,
): ContentNavigationLink & ContentNavigationItemExtra {
  const {
    iconTrailing,
    badge: showBadge,
    iconLeading,
    label,
    iconLeadingName,
    active,
    highlightColor,
    variant,
  } = cleanPropNames(item.properties, {
    '🚦State': 'state',
  })

  const badgeNode = showBadge
    ? findChild<DesignComponent<BadgeProperties>>(item, {
        type: 'INSTANCE',
        name: 'Badge',
      })
    : undefined

  const badge = badgeNode ? renderBadgeItem(badgeNode, { color: 'neutral', variant: 'outline', size: 'sm' }) : undefined

  const trailingIconNode = item.children[item.children.length - 1] as DesignComponent<IconProperties>
  const trailingIcon = iconTrailing ? getIconName(trailingIconNode.name) : undefined

  return {
    title: label,
    path: `#${toKebabCase(label)}`,
    ...pick(
      {
        icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
        badge,
        active: active === 'True',
        // These should be omitted in final `navigation`
        highlightColor: toLowerCase(highlightColor),
        variant: toLowerCase(variant),
        trailingIcon,
      },
      {
        active: false,
        highlightColor: 'primary',
        variant: 'pill',
        trailingIcon: ui.icons.chevronDown,
      },
    ),
  }
}

export type ContentNavigationItemsProperties = {
  '👁️ Active': 'True' | 'False'
  '🎨 HighlightColor': 'Neutral' | 'Primary'
}

export function renderContentNavigationItems(
  items: DesignComponent<ContentNavigationItemsProperties>,
): ContentNavigationLink {
  const item = renderContentNavigationItem(
    findChild<DesignComponent<ContentNavigationItemProperties>>(items, {
      type: 'INSTANCE',
      name: 'ContentNavigationItem',
    })!,
  )

  const children = findAll<DesignComponent<ContentNavigationLinkProperties>>(items, {
    type: 'INSTANCE',
    name: 'ContentNavigationLink',
  }).map(renderContentNavigationLink)

  const color = getFirst(children, 'color')
  const variant = getFirst(children, 'variant') || item.variant
  const highlight = getFirst(children, 'highlight')

  return {
    ...item,
    children: children.map(
      (link) => omit(link, 'color', 'variant', 'highlight') as ContentNavigationLink & ContentNavigationItemExtra,
    ),
    // These should be omitted in final `navigation`, along with `highlightColor`, `trailingIcon`
    color,
    variant,
    highlight,
  }
}

// eslint-disable-next-line ts/no-empty-object-type
export type ContentNavigationProperties = {}

export function ContentNavigation(component: DesignComponent<ContentNavigationProperties>) {
  const navigationItems = findChildren<DesignComponent<ContentNavigationItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'ContentNavigationItems',
  }).map(renderContentNavigationItems)

  return h(
    'UContentNavigation',
    {
      navigation: navigationItems.map(
        (item) =>
          omit(item, 'color', 'variant', 'highlight', 'highlightColor', 'trailingIcon') as ContentNavigationLink,
      ),
      color: getFirst(navigationItems, 'color'),
      highlightColor: getFirst(navigationItems, 'highlightColor'),
      variant: getFirst(navigationItems, 'variant'),
      highlight: !!getFirst(navigationItems, 'highlight'),
      trailingIcon: getFirst(navigationItems, 'trailingIcon'),
    },
    {
      color: 'primary',
      highlightColor: 'primary',
      variant: 'pill',
      highlight: false,
      trailingIcon: ui.icons.chevronDown,
    },
  )
}
