import type { DesignComponent } from '@tempad-dev/plugins'
import type { AvatarProps } from '../types'
import type { AvatarProperties } from './avatar'
import { findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { Avatar } from './avatar'

export type AvatarGroupProperties = {
  Size: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export function AvatarGroup(component: DesignComponent<AvatarGroupProperties>) {
  const { size } = cleanPropNames(component.properties)

  const avatars = findChildren<DesignComponent<AvatarProperties>>(component, {
    type: 'INSTANCE',
    name: 'Avatar',
  }).map((child) => Avatar(child))

  avatars.forEach((avatar) => {
    if ('size' in avatar.props) {
      const { size, ...props } = avatar.props
      avatar.props = props
    }
  })

  const last = avatars.at(-1)
  const lastProps = last?.props as AvatarProps | undefined
  const overflow = !Number.isNaN(Number.parseInt(lastProps?.alt || '', 10))

  return h(
    'UAvatarGroup',
    {
      size,
      max: overflow ? avatars.length - 1 : undefined,
    },
    {
      size: 'md',
    },
    overflow ? avatars.slice(0, -1) : avatars,
  )
}
