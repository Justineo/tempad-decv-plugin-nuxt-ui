import type { NavigationMenuChildItem, NavigationMenuItem } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { NavigationMenuProps } from '../types'
import type { BadgeProperties } from './badge'
import type { CollapsibleProperties } from './collapsible'
import type { IconProperties } from './icon'
import { omit } from '@s-libs/micro-dash'
import { findAll, findChild, findChildren, queryAll, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pickOverrides, toLowerCase } from '../utils'
import { renderBadgeItem } from './badge'
import { getIconName } from './icon'
import { getLinkTo } from './link'

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
    external: externalVariant,
    children: showChildren,
  } = cleanPropNames(item.properties)
  const badgeNode = showBadge
    ? queryOne<DesignComponent<BadgeProperties>>(item, [
        { query: 'child', type: 'FRAME', name: 'Container' },
        { query: 'child', type: 'INSTANCE', name: 'Badge' },
      ])
    : undefined

  const badge = badgeNode
    ? renderBadgeItem(
        badgeNode,
        {
          size: 'sm',
          color: 'neutral',
          variant: 'outline',
        },
        true,
      )
    : undefined

  const children =
    iconTrailing && showChildren
      ? findAll<DesignComponent<NavigationMenuDropdownItemProperties>>(item, {
          type: 'INSTANCE',
          name: 'NavigationMenu(DropdownItem)',
        }).map(renderNavigationMenuDropdownItem)
      : undefined

  const external = externalVariant === 'True'

  return pickOverrides(
    {
      label,
      icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
      to: getLinkTo(label, external ? 'external' : 'path'),
      badge,
      external,
      children: external ? undefined : children,
      active: active === 'True',
      disabled: state === 'Disabled',
      // These should be omitted in final `items`
      variant: toLowerCase(variant),
      color: toLowerCase(color),
      highlight: highlight === 'True',
    },
    {
      external: false,
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

  const items: (NavigationMenuItem & NavigationMenuItemExtra)[] = []

  if (orientation === 'Horizontal') {
    items.push(
      ...findChildren<DesignComponent<NavigationMenuItemProperties>>(component, {
        type: 'INSTANCE',
        name: 'NavigationMenuItem',
      }).map(renderNavigationMenuItem),
    )
  } else {
    items.push(
      ...findChildren<DesignComponent<CollapsibleProperties>>(component, {
        type: 'INSTANCE',
        name: 'Collapsible',
      }).map((panel) => {
        const item = renderNavigationMenuItem(
          findChild<DesignComponent<NavigationMenuItemProperties>>(panel, {
            type: 'INSTANCE',
            name: 'NavigationMenuItem',
          })!,
        )
        const children = queryAll<DesignComponent<NavigationMenuItemProperties>>(panel, [
          { query: 'child', type: 'INSTANCE', name: 'NavigationMenu(ChildList)' },
          { query: 'children', type: 'INSTANCE', name: 'NavigationMenuItem' },
        ]).map(renderNavigationMenuItem)

        const variant = getFirst(children, 'variant')
        const color = getFirst(children, 'color')
        const highlight = getFirst(children, 'highlight')

        return {
          ...item,
          children: item.external ? undefined : children,

          // These should be omitted in final `items`
          variant: variant || item.variant,
          color: color || item.color,
          highlight: highlight || item.highlight,
        }
      }),
    )
  }

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
