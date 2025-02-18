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
  '🙂 IconName': DesignComponent<IconProperties>
  '𝐓  Label': string
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Selected' | 'Hover' | 'Disabled'
  '◆ LeadingSlot': 'Avatar' | 'Dot' | 'Icon' | 'None'
}

export function renderInputMenuItem(
  item: DesignComponent<InputMenuItemProperties>,
): InputMenuItem {
  const { state, leadingSlot, label, iconName } = cleanPropNames(
    item.properties,
  )

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
      selected: false,
    },
  )
}

export type InputMenuProperties = {
  '👁️ isOpen': boolean
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function InputMenu(component: DesignComponent<InputMenuProperties>) {
  const { size } = cleanPropNames(component.properties)

  const container = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'InputMenu',
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
