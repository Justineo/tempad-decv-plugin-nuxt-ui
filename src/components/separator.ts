import type { DesignComponent } from '@tempad-dev/plugins'
import type { AvatarProperties } from './avatar'
import type { IconProperties } from './icon'
import { findChild } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { renderAvatarItem } from './avatar'
import { getIconName } from './icon'

export type SeparatorProperties = {
  '𝐓 Span': string
  '🙂 IconName': DesignComponent<IconProperties>
  '🎨 Color': 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '◆ Separator': 'Solid' | 'Dashed' | 'Dotted'
  '◆ Slot': 'Avatar' | 'Icon' | 'Span'
}

export function Separator(component: DesignComponent<SeparatorProperties>) {
  const { color, size, orientation, separator, slot, iconName, span } =
    cleanPropNames(component.properties)

  const avatar =
    slot === 'Avatar'
      ? findChild<DesignComponent<AvatarProperties>>(component, {
          type: 'INSTANCE',
          name: 'Avatar',
        })
      : undefined

  const avatarItem = avatar ? renderAvatarItem(avatar) : undefined

  return h(
    'USeparator',
    {
      label: (slot === 'Span' && span) || undefined,
      icon: (slot === 'Icon' && getIconName(iconName?.name)) || undefined,
      avatar: avatarItem,
      color: toLowerCase(color),
      size,
      type: toLowerCase(separator),
      orientation: toLowerCase(orientation),
    },
    {
      color: 'neutral',
      size: 'xs',
      type: 'solid',
      orientation: 'horizontal',
    },
  )
}
