import type { InputMenuItem } from '@nuxt/ui'
import type {
  DesignComponent,
  DevComponent,
  FrameNode,
  TextNode,
} from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import type { InputProperties } from './input'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick } from '../utils'
import { getRandomAvatar } from './avatar'
import { getIconName } from './icon'
import { Input, INPUT_NAMES } from './input'

export type InputMenuItemProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Selected' | 'Hover' | 'Disabled'
  '◆ LeadingSlot': 'Avatar' | 'Dot' | 'Icon' | 'None'
  '𝐓  Label': string
  '🙂 IconName'?: DesignComponent<IconProperties>
}

export function renderInputMenuItem(
  item: DesignComponent<InputMenuItemProperties>,
): InputMenuItem {
  const { properties } = item

  const { state, leadingSlot, label, iconName } = cleanPropNames(properties)

  return pick(
    {
      label,
      icon: leadingSlot === 'Icon' ? getIconName(iconName?.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      chip: leadingSlot === 'Dot' ? { color: 'primary' } : undefined,
      disabled: state === 'Disabled',
      selected: state === 'Selected',
    },
    {
      disabled: false,
    },
  )
}

export type InputMenuProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '👁️ isOpen': boolean
}

export function InputMenu(component: DesignComponent<InputMenuProperties>) {
  const { properties } = component

  const { size } = cleanPropNames(properties)

  const container = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'InputMenu',
    visible: true,
  })

  const items: InputMenuItem[] = container
    ? findChildren<TextNode | DesignComponent<InputMenuItemProperties>>(
        container,
        (node) =>
          (node.type === 'TEXT' && node.name === 'Title') ||
          (node.type === 'INSTANCE' &&
            node.name === 'InputMenuItem' &&
            node.visible === true),
      ).map((item) => {
        if (item.type === 'TEXT') {
          return {
            label: item.characters,
            type: 'label',
          }
        }

        return renderInputMenuItem(item)
      })
    : []

  const children: DevComponent['children'] = []

  const input = findChild<DesignComponent<InputProperties>>(component, {
    type: 'INSTANCE',
    name: INPUT_NAMES,
    visible: true,
  })

  const inputProps = input ? Input(input).props : {}

  return h(
    'UInputMenu',
    {
      size,
      items,
      ...inputProps,
    },
    {
      size: 'md',
    },
    children,
  )
}
