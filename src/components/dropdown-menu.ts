import type { DropdownMenuItem } from '@nuxt/ui'
import type { DesignComponent, DevComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProps, DropdownMenuProps } from '../types'
import type { AvatarProperties } from './avatar'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import { findChild, findChildren, queryAll } from '@tempad-dev/plugins'
import { cleanPropNames, h, pickOverrides } from '../utils'
import { Avatar, getRandomAvatar } from './avatar'
import { Button, BUTTON_NAMES } from './button'
import { getIconName } from './icon'
import { getKbdItems } from './kbd'

export type DropdownMenuItemProperties = {
  '🙂 IconTrailingName': DesignComponent<IconProperties>
  '🙂 IconLeadingName': DesignComponent<IconProperties>
  '𝐓 Label': string
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Hover' | 'Disabled' | 'Selected'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None'
  '◆ TrailingSlot': 'Icon' | 'Kbd' | 'None'
}

export function renderDropdownMenuItem(item: DesignComponent<DropdownMenuItemProperties>): DropdownMenuItem {
  const { properties } = item

  const { state, leadingSlot, trailingSlot, label, iconLeadingName, iconTrailingName } = cleanPropNames(properties)

  return pickOverrides(
    {
      label,
      icon: leadingSlot === 'Icon' ? getIconName(iconLeadingName.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      kbds: trailingSlot === 'Kbd' ? getKbdItems(item) : undefined,
      type: trailingSlot === 'Icon' && iconTrailingName.name === 'check' ? 'checkbox' : 'link',
      checked: trailingSlot === 'Icon' && iconTrailingName.name === 'check',
      disabled: state === 'Disabled',
    },
    {
      type: 'link',
      checked: false,
      disabled: false,
    },
  )
}

export type DropdownMenuProperties = {
  '👁️ Open': boolean
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Avatar' | 'Button'
  '⇅ Alignment': 'Bottom-start' | 'Bottom-end' | 'Right' | 'Top-start' | 'Left'
  '👁️ Arrow': 'True' | 'False'
}

const SIDE_MAP = {
  'Bottom-start': 'bottom',
  'Bottom-end': 'bottom',
  Right: 'right',
  'Top-start': 'top',
  Left: 'left',
} as const

export function DropdownMenu(
  component: DesignComponent<DropdownMenuProperties>,
  overrides: {
    button?: Partial<ButtonProps>
  } = {},
) {
  const { size, variant, alignment, arrow } = cleanPropNames(component.properties)

  const content: DropdownMenuProps['content'] = pickOverrides(
    {
      side: SIDE_MAP[alignment],
    },
    {
      side: 'bottom',
    },
  )

  const containers = queryAll<FrameNode>(component, [
    { query: 'child', type: 'FRAME', name: 'DropdownMenu' },
    { query: 'children', type: 'FRAME', name: /^Container/ },
  ])

  const items = containers.map((container) => {
    const menuItems = findChildren<DesignComponent<DropdownMenuItemProperties>>(container, {
      type: 'INSTANCE',
      name: 'DropdownMenuItem',
    })

    return menuItems.map((item) => renderDropdownMenuItem(item))
  })

  const children: DevComponent['children'] = []

  if (variant === 'Button') {
    const container =
      arrow === 'True'
        ? findChild<FrameNode>(component, {
            type: 'FRAME',
            name: 'Button + arrow',
          })
        : component

    const button = container
      ? findChild<DesignComponent<ButtonProperties>>(container, {
          type: 'INSTANCE',
          name: BUTTON_NAMES,
        })
      : undefined

    if (button) {
      const buttonChild = Button(button)
      buttonChild.props = {
        ...buttonChild.props,
        ...overrides.button,
      }
      children.push(buttonChild)
    }
  } else if (variant === 'Avatar') {
    const container =
      arrow === 'True'
        ? findChild<FrameNode>(component, {
            type: 'FRAME',
            name: 'Avatar + arrow',
          })
        : component

    const avatar = container
      ? findChild<DesignComponent<AvatarProperties>>(container, {
          type: 'INSTANCE',
          name: 'Avatar',
        })
      : undefined

    if (avatar) {
      children.push(Avatar(avatar))
    }
  }

  return h(
    'UDropdownMenu',
    {
      size,
      items,
      content,
      arrow: arrow === 'True',
    },
    {
      size: 'md',
      arrow: false,
    },
    children,
  )
}
