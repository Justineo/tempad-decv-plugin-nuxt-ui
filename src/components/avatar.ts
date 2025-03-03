import type { DesignComponent, TextNode } from '@tempad-dev/plugins'
import type { AvatarProps, ChipProps } from '../types'
import type { IconProperties } from './icon'
import { findChild } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getIconName } from './icon'

export type AvatarProperties = {
  '🙂 IconName': DesignComponent<IconProperties>
  '📏 Size': '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  '◆ Variant': 'Image' | 'Icon' | 'Alt'
  '◆ ChipPosition': 'Bottom-left' | 'Bottom-right' | 'None' | 'Top-left' | 'Top-right'
}

export function Avatar(component: DesignComponent<AvatarProperties>, defaults: Partial<AvatarProps> = {}) {
  const { variant, size, iconName, chipPosition } = cleanPropNames(component.properties)

  const altText = findChild<TextNode>(component, {
    type: 'TEXT',
  })?.characters

  const Avatar = h(
    'UAvatar',
    {
      icon: variant === 'Icon' ? getIconName(iconName.name) : undefined,
      alt: variant === 'Alt' ? altText : undefined,
      ...(variant === 'Image' ? getRandomAvatar() : {}),
      size,
    },
    {
      size: 'md',
      ...defaults,
    },
  )

  if (chipPosition === 'None') {
    return Avatar
  }

  const position = toLowerCase(chipPosition)

  return h(
    'UChip',
    {
      inset: true,
      position,
    },
    {
      position: 'top-right',
    },
    [Avatar],
  )
}

const USERNAMES = [
  'benjamincanac',
  'romhml',
  'smarroufin',
  'atinux',
  'Haythamasalama',
  'hywax',
  'danielroe',
  'sandros94',
  'malik-jouda',
  'connerblanton',
  'antfu',
  'Justineo',
] as const

export type AvatarItem = Pick<AvatarProps, 'src' | 'alt'>

export function getAvatar(username: (typeof USERNAMES)[number]): Required<AvatarItem> {
  return {
    src: `https://github.com/${username}.png`,
    alt: `@${username}`,
  }
}

export function getRandomAvatar(): Required<AvatarItem> {
  return getAvatar(USERNAMES[Math.floor(Math.random() * USERNAMES.length)]!)
}

export function renderAvatarItem(
  avatar: DesignComponent<AvatarProperties>,
  defaults: Partial<AvatarProps> = {},
): Partial<AvatarProps & { chip?: ChipProps }> {
  const { props, children } = Avatar(avatar, defaults)

  const child = children[0]
  if (child && typeof child !== 'string' && child.name === 'UAvatar') {
    return {
      ...child.props,
      chip: props,
    }
  }

  return props as AvatarProps
}
