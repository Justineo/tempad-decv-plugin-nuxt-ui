import type { SelectMenuItem } from '@nuxt/ui'
import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import type { SelectMenuProps } from '../types'
import type { IconProperties } from './icon'
import type { InputProperties } from './input'
import type { SelectProperties } from './select'
import { omit } from '@s-libs/micro-dash'
import { findChild, findChildren, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, getFirst, h, pickOverrides } from '../utils'
import { getRandomAvatar } from './avatar'
import { ui } from './config'
import { getIconName } from './icon'
import { Input, INPUT_NAMES } from './input'
import { Select, SELECT_NAMES } from './select'

export type SelectMenuItemProperties = {
  '🙂 IconName': DesignComponent<IconProperties>
  '𝐓  Label': string
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Selected' | 'Hover' | 'Disabled'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None' | 'Span'
}

export type SelectMenuItemExtra = {
  selected?: boolean
} & Pick<SelectMenuProps, 'trailingIcon'>

export function renderSelectMenuItem(
  item: DesignComponent<SelectMenuItemProperties>,
): SelectMenuItem & SelectMenuItemExtra {
  const { properties } = item

  const { state, leadingSlot, label, iconName } = cleanPropNames(properties)

  const trailingIcon =
    state === 'Selected' ? findChild<DesignComponent<IconProperties>>(item, { type: 'INSTANCE' }) : undefined

  return pickOverrides(
    {
      label,
      icon: leadingSlot === 'Icon' ? getIconName(iconName.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      disabled: state === 'Disabled',
      // These should be omitted in final `items`
      selected: state === 'Selected',
      trailingIcon: trailingIcon ? getIconName(trailingIcon.name) : undefined,
    },
    {
      disabled: false,
      selected: false,
    },
  )
}

export type SelectMenuProperties = {
  '👁️ IsOpen': boolean
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function SelectMenu(component: DesignComponent<SelectMenuProperties>) {
  const menu = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'SelectMenu',
  })

  const container = menu
    ? findChild<FrameNode>(menu, {
        type: 'FRAME',
        name: 'Container',
      })
    : undefined

  const items: (SelectMenuItem & SelectMenuItemExtra)[] = container
    ? findChildren<FrameNode | DesignComponent<SelectMenuItemProperties>>(
        container,
        (node) =>
          (node.type === 'FRAME' && node.name === 'Title') ||
          (node.type === 'INSTANCE' && node.name === 'SelectMenuItem'),
      ).map((item) => {
        if (item.type === 'FRAME') {
          const text = findChild<TextNode>(item, {
            type: 'TEXT',
          })
          return {
            label: text?.characters,
            type: 'label',
          }
        }

        return renderSelectMenuItem(item)
      })
    : []

  const selectedIcon = getFirst(items, 'trailingIcon')

  const select = findChild<DesignComponent<SelectProperties>>(component, {
    type: 'INSTANCE',
    name: SELECT_NAMES,
  })

  const search = menu
    ? queryOne<DesignComponent<InputProperties>>(menu, [
        {
          query: 'child',
          type: 'INSTANCE',
          name: 'Input',
        },
        {
          query: 'child',
          type: 'INSTANCE',
          name: INPUT_NAMES,
        },
      ])
    : undefined

  const { content, ...selectProps } = select ? Select(select).props : {}
  const inputProps = search ? Input(search, { placeholder: 'Search...', variant: 'none' }).props : {}

  return h(
    'USelectMenu',
    {
      ...selectProps,
      items: items.map((item) => omit(item, 'selected', 'trailingIcon')),
      selectedIcon,
      searchInput: inputProps,
    },
    {
      selectedIcon: ui.icons.check,
    },
  )
}
