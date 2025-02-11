import type { DropdownMenuItem, DropdownMenuProps } from '@nuxt/ui'
import type {
  DesignComponent,
  DevComponent,
  FrameNode,
} from '@tempad-dev/plugins'
import type { AvatarProperties } from './avatar'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick } from '../utils'
import { Avatar, getRandomAvatar } from './avatar'
import { Button, BUTTON_NAMES } from './button'
import { getIconName } from './icon'
import { getKbdItems } from './kbd'

export type DropdownMenuItemProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Hover' | 'Disabled' | 'Selected'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None'
  '◆ TrailingSlot': 'Icon' | 'Kbd' | 'None'
  '𝐓 Label': string
  '🙂 IconLeadingName'?: DesignComponent<IconProperties>
  '🙂 IconTrailingName'?: DesignComponent<IconProperties>
}

export function renderDropdownMenuItem(
  item: DesignComponent<DropdownMenuItemProperties>,
): DropdownMenuItem {
  const { properties } = item

  const {
    state,
    leadingSlot,
    trailingSlot,
    label,
    iconLeadingName,
    iconTrailingName,
  } = cleanPropNames(properties)

  return pick(
    {
      label,
      icon:
        leadingSlot === 'Icon' ? getIconName(iconLeadingName?.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      kbds: trailingSlot === 'Kbd' ? getKbdItems(item) : undefined,
      type:
        trailingSlot === 'Icon' && iconTrailingName?.name === 'check'
          ? 'checkbox'
          : 'link',
      checked: trailingSlot === 'Icon' && iconTrailingName?.name === 'check',
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
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Avatar' | 'Button'
  '⇅ Alignment': 'Bottom-start' | 'Bottom-end' | 'Right' | 'Top-start' | 'Left'
  '👁️ Arrow': 'True' | 'False'
  '👁️ Open': boolean
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
) {
  const { properties } = component

  const { size, variant, alignment, arrow } = cleanPropNames(properties)

  const content: DropdownMenuProps<DropdownMenuItem>['content'] = pick(
    {
      side: SIDE_MAP[alignment],
    },
    {
      side: 'bottom',
    },
  )

  const container = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'DropdownMenu',
    visible: true,
  })

  const itemContainers = container
    ? findChildren<FrameNode>(container, {
        type: 'FRAME',
        name: /^Container/,
        visible: true,
      })
    : []

  const items = itemContainers.map((itemContainer) => {
    const menuItems = findChildren<DesignComponent<DropdownMenuItemProperties>>(
      itemContainer,
      {
        type: 'INSTANCE',
        name: 'DropdownMenuItem',
        visible: true,
      },
    )

    return menuItems.map(renderDropdownMenuItem)
  })

  const children: DevComponent['children'] = []

  if (variant === 'Button') {
    const container = findChild<FrameNode>(component, {
      type: 'FRAME',
      name: 'Button + arrow',
      visible: true,
    })

    const button = container
      ? findChild<DesignComponent<ButtonProperties>>(container, {
          type: 'INSTANCE',
          name: BUTTON_NAMES,
          visible: true,
        })
      : undefined

    if (button) {
      children.push(Button(button))
    }
  } else if (variant === 'Avatar') {
    const container = findChild<FrameNode>(component, {
      type: 'FRAME',
      name: 'Avatar + arrow',
      visible: true,
    })

    const avatar = container
      ? findChild<DesignComponent<AvatarProperties>>(container, {
          type: 'INSTANCE',
          name: 'Avatar',
          visible: true,
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
