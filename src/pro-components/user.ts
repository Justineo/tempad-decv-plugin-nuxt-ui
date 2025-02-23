import type { DesignComponent } from '@tempad-dev/plugins'
import type { AvatarProperties } from '../components/avatar'
import type { UserProps } from '../types'
import { omit } from '@s-libs/micro-dash'
import { findChild } from '@tempad-dev/plugins'
import { renderAvatarItem } from '../components/avatar'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type UserProperties = {
  '👁️ Description': boolean
  '↳ Description': string
  '𝐓 Name': string
  '📏 Size': '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '👁️ Chip': 'False' | 'True'
}

export function User(component: DesignComponent<UserProperties>) {
  const { showDescription, description, name, size, orientation } = cleanPropNames(component.properties, {
    '👁️ Description': 'showDescription',
  })

  const avatar = findChild<DesignComponent<AvatarProperties>>(component, { type: 'INSTANCE', name: 'Avatar' })
  const { chip, ...avatarItem } = avatar ? omit(renderAvatarItem(avatar), 'size') : {}

  return h(
    'UUser',
    {
      name,
      description: (showDescription && description) || undefined,
      avatar: Object.keys(avatarItem).length > 0 ? avatarItem : undefined,
      chip: omit(chip, 'size', 'inset'),
      size: toLowerCase(size),
      orientation: toLowerCase(orientation),
    },
    {
      size: 'md',
      orientation: 'horizontal',
    },
  )
}

export function renderUserItem(user: DesignComponent<UserProperties>): Partial<UserProps> {
  const {
    props: { orientation, ...rest },
  } = User(user)

  return rest
}
