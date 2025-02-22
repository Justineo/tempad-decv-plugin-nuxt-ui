import type { NavigationMenuChildItem, NavigationMenuItem } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { NavigationMenuProps } from '../types'
import type { BadgeProperties } from './badge'
import type { IconProperties } from './icon'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChildren, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pick, toLowerCase } from '../utils'
import { renderBadgeItem } from './badge'
import { getIconName } from './icon'

export type NavigationMenuDropdownItemProperties = {
  '👁️ Description': boolean
  '↳ DescriptionSlot': string
  '𝐓 Title': string
  '👁️ Icon': boolean
  '↳ IconName': DesignComponent<IconProperties>
  '🚦 State': 'Active' | 'Default' | 'Focused' | 'Hover'
}

export function renderNavigationMenuDropdownItem(
  item: DesignComponent<NavigationMenuDropdownItemProperties>,
): NavigationMenuChildItem {
  const { icon, iconName, title, description, descriptionSlot } = cleanPropNames(item.properties)

  return {
    label: title,
    description: (description && descriptionSlot) || undefined,
    icon: icon ? getIconName(iconName.name) : undefined,
  }
}

export type NavigationMenuItemProperties = {
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '𝐓 Label': string
  '👁️ Children': boolean
  '👁️ Badge': boolean
  '👁️ IconTrailing': boolean
  '👁️ IconLeading': boolean
  '🎨 Color': 'Neutral' | 'Primary'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '◆ Variant': 'Link' | 'Pill'
  '🚦 State': 'Default' | 'Hover' | 'Disabled' | 'Focus'
  '👁️ Active': 'False' | 'True'
  '👁️ Highlight': 'False' | 'True'
  '👁️ External': 'False' | 'True'
}

type NavigationMenuItemExtra = Pick<NavigationMenuProps, 'color' | 'variant' | 'highlight'>

export function renderNavigationMenuItem(
  item: DesignComponent<NavigationMenuItemProperties>,
): NavigationMenuItem & NavigationMenuItemExtra {
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
  } = cleanPropNames(item.properties)
  const badgeNode = showBadge
    ? queryOne<DesignComponent<BadgeProperties>>(item, [
        { query: 'child', type: 'FRAME', name: 'Container' },
        { query: 'child', type: 'INSTANCE', name: 'Badge' },
      ])
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
      }).map(renderNavigationMenuDropdownItem)
    : undefined

  return pick(
    {
      label,
      icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
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

export function NavigationMenu(component: DesignComponent<NavigationMenuProperties>) {
  const { orientation, highlight } = cleanPropNames(component.properties)

  const items = findChildren<DesignComponent<NavigationMenuItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'NavigationMenuItem',
  }).map(renderNavigationMenuItem)

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
