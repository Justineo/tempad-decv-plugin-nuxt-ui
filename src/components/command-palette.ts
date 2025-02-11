import type { CommandPaletteItem } from '@nuxt/ui'
import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import type { InputProperties } from './input'
import { findChild, findChildren, findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick } from '../utils'
import { getRandomAvatar } from './avatar'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'
import { getIconName } from './icon'
import { Input, INPUT_NAMES } from './input'
import { getKbdItems } from './kbd'

export type CommandPaletteItemProperties = {
  '🚦 State': 'Default' | 'Disabled' | 'Hover'
  '◆ LeadingSlot': 'Icon' | 'Avatar' | 'None'
  '◆ TrailingSlot': 'None' | 'Icon' | 'Kbd'
  '👁️ Description': boolean
  '𝐓 Label': string
  '↳ DescriptionSlot'?: string
  '🙂 IconLeadingName'?: DesignComponent<IconProperties>
  '🙂 IconTrailingName'?: DesignComponent<IconProperties>
}

export function renderCommandPaletteItem(
  item: DesignComponent<CommandPaletteItemProperties>,
): CommandPaletteItem {
  const { properties } = item

  const {
    state,
    leadingSlot,
    trailingSlot,
    description,
    label,
    descriptionSlot,
    iconLeadingName,
    iconTrailingName,
  } = cleanPropNames(properties)

  return pick(
    {
      label,
      suffix: (description && descriptionSlot) || undefined,
      icon:
        leadingSlot === 'Icon' ? getIconName(iconLeadingName?.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      kbds: trailingSlot === 'Kbd' ? getKbdItems(item) : undefined,
      active: trailingSlot === 'Icon' && iconTrailingName?.name === 'check',
      disabled: state === 'Disabled',
    },
    {
      active: false,
      disabled: false,
    },
  )
}

export type CommandPaletteProperties = {
  '◆ Open': 'Drawer' | 'Modal'
}

export function CommandPalette(
  component: DesignComponent<CommandPaletteProperties>,
) {
  const input = findOne<DesignComponent<InputProperties>>(component, {
    type: 'INSTANCE',
    name: INPUT_NAMES,
    visible: true,
  })

  const inputComponent = input ? Input(input) : undefined

  const { icon, placeholder, disabled } = inputComponent?.props || {}

  const container = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'CommandPalette',
    visible: true,
  })

  const itemContainers = container
    ? findChildren<FrameNode>(container, {
        type: 'FRAME',
        name: /^Container/,
        visible: true,
      })
    : []

  let activeCount = 0

  const groups = itemContainers.map((itemContainer) => {
    const title = findChild<TextNode>(itemContainer, {
      type: 'TEXT',
      name: 'Title',
      visible: true,
    })?.characters

    const items = findChildren<DesignComponent<CommandPaletteItemProperties>>(
      itemContainer,
      {
        type: 'INSTANCE',
        name: 'CommandPaletteItem',
        visible: true,
      },
    ).map((item) => {
      const menuItem = renderCommandPaletteItem(item)

      if (menuItem.active) {
        activeCount++
      }

      return menuItem
    })

    return {
      label: title,
      items,
    }
  })

  const closeButton = findOne<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
    visible: true,
  })

  const buttonProps = closeButton
    ? renderButtonItem(closeButton, {
        size: 'md',
        color: 'neutral',
        variant: 'ghost',
      })
    : false

  const { icon: closeIcon, square, ...props } = buttonProps || {}

  return h(
    'UCommandPalette',
    {
      icon,
      placeholder,
      close: closeButton
        ? Object.keys(props).length > 0
          ? props
          : true
        : false,
      closeIcon,
      groups,
      multiple: activeCount > 1,
      disabled,
    },
    {
      icon: ui.icons.search,
      placeholder: 'Type a command or search...',
      close: false,
      closeIcon: ui.icons.close,
      multiple: false,
      disabled: false,
    },
  )
}
