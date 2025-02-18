import type { BreadcrumbItem } from '@nuxt/ui'
import type {
  DesignComponent,
  DevComponent,
  FrameNode,
  TextNode,
} from '@tempad-dev/plugins'
import type { DropdownMenuProperties } from './dropdown-menu'
import type { IconProperties } from './icon'
import { findChild, findChildren, queryOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, isIcon, renderSlot } from '../utils'
import { ui } from './config'
import { DropdownMenu } from './dropdown-menu'
import { getIconName } from './icon'

export type BreadcrumbProperties = {
  '🙂 IconName3': DesignComponent<IconProperties>
  '🙂 IconName2': DesignComponent<IconProperties>
  '🙂 IconName1': DesignComponent<IconProperties>
  '𝐓 SeparatorSlot': string
  '🙂 SeparatorIconName': DesignComponent<IconProperties>
  '◆ LeadingSlot': 'Icon' | 'None' | 'Span'
  '◆ Divider': 'Icon' | 'Span'
  '👁️ Background': 'False' | 'True'
  '👁️ DropdownMenu': 'True' | 'False'
}

export function Breadcrumb(component: DesignComponent<BreadcrumbProperties>) {
  const { leadingSlot, divider, separatorIconName, separatorSlot } =
    cleanPropNames(component.properties)

  const itemNodes = findChildren<
    TextNode | FrameNode | DesignComponent<DropdownMenuProperties>
  >(component, {
    name: /^Link|^DropdownMenu/,
  })

  const items: BreadcrumbItem[] = []
  const children: DevComponent['children'] = []

  itemNodes.forEach((node) => {
    const { type, name } = node
    if (type === 'FRAME' && name.startsWith('Link')) {
      const label =
        queryOne<TextNode>(node, [
          {
            query: 'child',
            type: 'INSTANCE',
            name: 'Link',
          },
          {
            query: 'child',
            type: 'TEXT',
            name: 'Label',
          },
        ])?.characters || undefined

      const icon =
        leadingSlot === 'Icon' && isIcon(node.children[0]!)
          ? getIconName(node.children[0]!.name)
          : undefined

      items.push({
        label,
        icon,
      })
    } else if (type === 'INSTANCE' && name === 'Link') {
      items.push({
        label:
          findChild<TextNode>(node, {
            type: 'TEXT',
            name: 'Label',
          })?.characters || undefined,
      })
    } else if (type === 'INSTANCE' && name === 'DropdownMenu') {
      const menu = DropdownMenu(node, {
        button: {
          icon: undefined,
          ':icon': 'item.icon',
        },
      })

      if (!menu) {
        items.push({
          icon: ui.icons.ellipsis,
        })

        return
      }

      const { items: menuItems, ...props } = menu.props
      menu.props = props
      // @ts-expect-error `:items` is not a valid prop but we need to override it here
      menu.props[':items'] = 'item.children'

      items.push({
        icon: ui.icons.ellipsis,
        slot: 'dropdown',
        children: menuItems,
      })

      children.push(renderSlot('dropdown', '{ item }', [menu]))
    }
  })

  if (divider === 'Span' && separatorSlot) {
    children.push(renderSlot('separator', [separatorSlot]))
  }

  return h(
    'UBreadcrumb',
    {
      items,
      separatorIcon:
        divider === 'Icon' ? getIconName(separatorIconName.name) : undefined,
    },
    {
      separatorIcon: ui.icons.chevronRight,
    },
    children,
  )
}
