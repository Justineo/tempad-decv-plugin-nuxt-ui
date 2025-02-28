import type { CommandPaletteItem } from '@nuxt/ui'
import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import type { InputProperties } from './input'
import { findChild, findChildren, findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick, toKebabCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'
import { getIconName } from './icon'
import { Input, INPUT_NAMES } from './input'
import { getKbdItems } from './kbd'

export type CommandPaletteItemProperties = {
  '👁️ Description': boolean
  '𝐓 Label': string
  '🙂 IconTrailingName': DesignComponent<IconProperties>
  '↳ DescriptionSlot': string
  '🙂 IconLeadingName': DesignComponent<IconProperties>
  '🚦 State': 'Default' | 'Disabled' | 'Hover'
  '◆ LeadingSlot': 'Icon' | 'Avatar' | 'None'
  '◆ TrailingSlot': 'None' | 'Icon' | 'Kbd'
}

export function renderCommandPaletteItem(item: DesignComponent<CommandPaletteItemProperties>): CommandPaletteItem {
  const { state, leadingSlot, trailingSlot, description, label, descriptionSlot, iconLeadingName, iconTrailingName } =
    cleanPropNames(item.properties)

  return pick(
    {
      label,
      suffix: (description && descriptionSlot) || undefined,
      icon: leadingSlot === 'Icon' ? getIconName(iconLeadingName.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      kbds: trailingSlot === 'Kbd' ? getKbdItems(item) : undefined,
      active: trailingSlot === 'Icon' && iconTrailingName.name === 'check',
      disabled: state === 'Disabled',
    },
    {
      active: false,
      disabled: false,
    },
  )
}

export type CommandPaletteProperties = {
  '◆ Open': 'Drawer' | 'Modal' | 'Default'
}

export function CommandPalette(component: DesignComponent<CommandPaletteProperties>) {
  const { open } = cleanPropNames(component.properties)

  const palette =
    open === 'Default'
      ? component
      : findChild<DesignComponent<CommandPaletteProperties>>(component, {
          type: 'FRAME',
          name: 'CommandPalette',
        })

  const input = palette
    ? findChild<DesignComponent<InputProperties>>(palette, {
        type: 'INSTANCE',
        name: INPUT_NAMES,
      })
    : undefined

  const inputComponent = input ? Input(input) : undefined

  const { icon, placeholder, disabled } = inputComponent?.props || {}

  const containers = palette
    ? findChildren<FrameNode>(palette, {
        type: 'FRAME',
        name: /^Container/,
      })
    : []

  let activeCount = 0

  const groups = containers.map((container) => {
    const title = findChild<TextNode>(container, {
      type: 'TEXT',
      name: 'Title',
    })?.characters

    const items = findChildren<DesignComponent<CommandPaletteItemProperties>>(container, {
      type: 'INSTANCE',
      name: 'CommandPaletteItem',
    }).map((item) => {
      const menuItem = renderCommandPaletteItem(item)

      if (menuItem.active) {
        activeCount++
      }

      return menuItem
    })

    return {
      id: toKebabCase(title || ''),
      label: title,
      items,
    }
  })

  const closeButton = findOne<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
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
      close: closeButton ? (Object.keys(props).length > 0 ? props : true) : false,
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
