import type { TabsItem } from '@nuxt/ui'
import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { BadgeProperties } from './badge'
import type { IconProperties } from './icon'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pickOverrides, renderSlot, toKebabCase, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { Badge } from './badge'
import { getIconName } from './icon'

export type TabsItemProperties = {
  '↳ IconName': DesignComponent<IconProperties>
  '👁️ Icon': boolean
  '👁️ Avatar': boolean
  '𝐓 Label': string
  '👁️ Badge': boolean
  '🎨 Color': 'Neutral' | 'Primary'
  '◆ Variant': 'Pill' | 'Link (Horizontal)' | 'Link (Vertical)'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Hover' | 'Selected' | 'Focus' | 'Disabled'
  '◆ LeadingSlot': 'Avatar' | 'Icon'
}

export function renderTabsItem(item: DesignComponent<TabsItemProperties>): TabsItem {
  const { state, leadingSlot, avatar, icon, iconName, label } = cleanPropNames(item.properties)

  return pickOverrides(
    {
      label,
      icon: leadingSlot === 'Icon' && icon ? getIconName(iconName.name) : undefined,
      avatar: leadingSlot === 'Avatar' && avatar ? getRandomAvatar() : undefined,
      disabled: state === 'Disabled',
    },
    {
      disabled: false,
    },
  )
}

export type TabsProperties = {
  '🎨 Color': 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Pill' | 'Link'
  '⇅ Align': 'Horizontal' | 'Vertical'
}

export function Tabs(component: DesignComponent<TabsProperties>) {
  const { color, size, variant, align } = cleanPropNames(component.properties)

  const children: DevComponent['children'] = []
  const items: TabsItem[] = []

  findChildren<DesignComponent<TabsItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'Tab',
  }).forEach((tab) => {
    const item = renderTabsItem(tab)

    const badge = findChild<DesignComponent<BadgeProperties>>(tab, {
      type: 'INSTANCE',
      name: 'Badge',
    })
    const badgeComponent = badge ? Badge(badge) : undefined

    if (badgeComponent) {
      const slug = toKebabCase(item.label || '')
      item.slot = slug
      children.push(renderSlot(slug, [badgeComponent]))
    }

    items.push(item)
  })

  return h(
    'UTabs',
    {
      items,
      color: toLowerCase(color),
      variant: toLowerCase(variant),
      size,
      orientation: toLowerCase(align),
    },
    {
      color: 'primary',
      variant: 'pill',
      size: 'md',
      orientation: 'horizontal',
    },
    children,
  )
}
