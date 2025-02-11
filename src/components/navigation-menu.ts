import type {
  NavigationMenuChildItem,
  NavigationMenuItem,
  NavigationMenuProps,
} from '@nuxt/ui'
import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { BadgeProperties } from './badge'
import type { IconProperties } from './icon'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pick, toLowerCase } from '../utils'
import { renderBadgeItem } from './badge'
import { getIconName } from './icon'

export type NavigationMenuDropdownItemProperties = {
  '🚦 State': 'Active' | 'Default' | 'Focused' | 'Hover'
  '👁️ Icon': boolean
  '↳ IconName'?: DesignComponent<IconProperties>
  '𝐓 Title': string
  '👁️ Description': boolean
  '↳ DescriptionSlot'?: string
}

export function renderNavigationMenuDropdownItem(
  item: DesignComponent<NavigationMenuDropdownItemProperties>,
): NavigationMenuChildItem {
  const { properties } = item

  const { icon, iconName, title, description, descriptionSlot } =
    cleanPropNames(properties)

  return {
    label: title,
    description: (description && descriptionSlot) || undefined,
    icon: icon ? getIconName(iconName?.name) : undefined,
  }
}

export type NavigationMenuItemProperties = {
  '🎨 Color': 'Neutral' | 'Primary'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '◆ Variant': 'Link' | 'Pill'
  '🚦 State': 'Default' | 'Hover' | 'Disabled' | 'Focus'
  '👁️ Active': 'False' | 'True'
  '👁️ Highlight': 'False' | 'True'
  '👁️ IconLeading': boolean
  '↳ IconLeadingName'?: DesignComponent<IconProperties>
  '👁️ IconTrailing': boolean
  '👁️ Badge': boolean
  '𝐓 Label': string
}

type NavigationMenuItemExtra = Pick<
  NavigationMenuProps<NavigationMenuItem>,
  'color' | 'variant' | 'highlight'
>

export function renderNavigationMenuItem(
  item: DesignComponent<NavigationMenuItemProperties>,
): NavigationMenuItem & NavigationMenuItemExtra {
  const { properties } = item

  const {
    color,
    variant,
    state,
    active,
    highlight,
    iconLeading,
    iconLeadingName,
    iconTrailing,
    badge: showBadge,
    label,
  } = cleanPropNames(properties)

  const container = showBadge
    ? findChild<FrameNode>(item, {
        type: 'FRAME',
        name: 'Container',
        visible: true,
      })
    : undefined

  const badgeNode = container
    ? findChild<DesignComponent<BadgeProperties>>(container, {
        type: 'INSTANCE',
        name: 'Badge',
        visible: true,
      })
    : undefined

  const badgeItem = badgeNode
    ? renderBadgeItem(badgeNode, {
        size: 'sm',
        color: 'neutral',
        variant: 'outline',
      })
    : undefined

  let badge: NavigationMenuItem['badge'] = badgeItem
  if (badgeItem) {
    if (Object.keys(badgeItem).length === 1 && badgeItem.label != null) {
      if (String(Number(badgeItem.label)) === badgeItem.label) {
        badge = Number(badgeItem.label)
      } else {
        badge = badgeItem.label
      }
    }
  }

  const children = iconTrailing
    ? findAll<DesignComponent<NavigationMenuDropdownItemProperties>>(item, {
        type: 'INSTANCE',
        name: 'NavigationMenu(DropdownItem)',
        visible: true,
      }).map(renderNavigationMenuDropdownItem)
    : undefined

  return pick(
    {
      label,
      icon: iconLeading ? getIconName(iconLeadingName?.name) : undefined,
      badge,
      children,
      active: active === 'True',
      disabled: state === 'Disabled',
      // These should be omitted in final `items`
      variant: toLowerCase(variant),
      color: toLowerCase(color),
      highlight: highlight === 'True',
    },
    {
      active: false,
      disabled: false,
      variant: 'pill',
      color: 'primary',
      highlight: false,
    },
  )
}

export type NavigationMenuProperties = {
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '👁️ Highlight': 'False' | 'True'
}

export function NavigationMenu(
  component: DesignComponent<NavigationMenuProperties>,
) {
  const { properties } = component

  const { orientation, highlight } = cleanPropNames(properties)

  const items = findChildren<DesignComponent<NavigationMenuItemProperties>>(
    component,
    {
      type: 'INSTANCE',
      name: 'NavigationMenuItem',
      visible: true,
    },
  ).map(renderNavigationMenuItem)

  return h(
    'UNavigationMenu',
    {
      items: items.map((item) => omit(item, 'variant', 'color', 'highlight')),
      color: getFirst(items, 'color'),
      variant: getFirst(items, 'variant'),
      orientation: toLowerCase(orientation),
      highlight: highlight === 'True' || !!getFirst(items, 'highlight'),
    },
    {
      color: 'primary',
      variant: 'pill',
      orientation: 'horizontal',
      highlight: false,
    },
  )
}
