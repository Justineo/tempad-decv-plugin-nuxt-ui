import type { SelectMenuItem } from '@nuxt/ui'
import type {
  DesignComponent,
  DevComponent,
  FrameNode,
  TextNode,
} from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import type { InputProperties } from './input'
import type { SelectProperties } from './select'
import { findChild, findChildren, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick } from '../utils'
import { getRandomAvatar } from './avatar'
import { getIconName } from './icon'
import { Input, INPUT_NAMES } from './input'
import { Select, SELECT_NAMES } from './select'

export type SelectMenuItemProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Selected' | 'Hover' | 'Disabled'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None'
  '🙂 IconName'?: DesignComponent<IconProperties>
  '𝐓  Label': string
}

export function renderSelectMenuItem(
  item: DesignComponent<SelectMenuItemProperties>,
): SelectMenuItem {
  const { properties } = item

  const { state, leadingSlot, label, iconName } = cleanPropNames(properties)

  return pick(
    {
      label,
      icon: leadingSlot === 'Icon' ? getIconName(iconName?.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      disabled: state === 'Disabled',
      selected: state === 'Selected',
    },
    {
      disabled: false,
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

  const items: SelectMenuItem[] = container
    ? findChildren<FrameNode | DesignComponent<SelectMenuItemProperties>>(
        container,
        (node) =>
          (node.type === 'FRAME' &&
            node.name === 'Title' &&
            node.visible === true) ||
          (node.type === 'INSTANCE' &&
            node.name === 'SelectMenuItem' &&
            node.visible === true),
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

  const children: DevComponent['children'] = []

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
  const inputProps = search
    ? Input(search, { placeholder: 'Search...', variant: 'none' }).props
    : {}

  return h(
    'USelectMenu',
    {
      ...selectProps,
      items,
      searchInput: inputProps,
    },
    {},
    children,
  )
}
