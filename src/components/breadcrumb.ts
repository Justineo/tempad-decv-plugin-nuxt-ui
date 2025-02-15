import type { BreadcrumbItem } from '@nuxt/ui'
import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import type { LinkProperties } from './link'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, renderSlot } from '../utils'
import { ui } from './config'
import { getIconName } from './icon'

export type BreadcrumbProperties = {
  '◆ LeadingSlot': 'Icon' | 'None' | 'Span'
  '◆ Divider': 'Icon' | 'Span'
  '👁️ Background': 'False' | 'True'
  '👁️ DropdownMenu': 'True' | 'False'
  '🙂 SeparatorIconName'?: DesignComponent<IconProperties>
  '𝐓 SeparatorSlot'?: string
  '🙂 IconName1'?: DesignComponent<IconProperties>
  '🙂 IconName2'?: DesignComponent<IconProperties>
  '🙂 IconName3'?: DesignComponent<IconProperties>
}

export function Breadcrumb(component: DesignComponent<BreadcrumbProperties>) {
  const { properties } = component

  const {
    leadingSlot,
    divider,
    separatorIconName,
    separatorSlot,
    iconName1,
    iconName2,
    iconName3,
  } = cleanPropNames(properties)

  const icons = [iconName1, iconName2, iconName3]

  const items: BreadcrumbItem[] = []

  if (leadingSlot === 'None' || leadingSlot === 'Span') {
    const links = findChildren<DesignComponent<LinkProperties>>(component, {
      type: 'INSTANCE',
      name: 'Link',
      visible: true,
    })
    items.push(
      ...links.map((link) => ({
        label:
          findChild<TextNode>(link, {
            type: 'TEXT',
            name: 'Label',
            visible: true,
          })?.characters || undefined,
      })),
    )
  } else {
    const linkFrames = findChildren<FrameNode>(component, {
      name: /Link \d+/,
      visible: true,
    })
    items.push(
      ...linkFrames.map((linkFrame, index) => {
        const link = findChild<DesignComponent<LinkProperties>>(linkFrame, {
          type: 'INSTANCE',
          name: 'Link',
          visible: true,
        })
        const label = link
          ? findChild<TextNode>(link, {
              type: 'TEXT',
              name: 'Label',
              visible: true,
            })?.characters
          : undefined

        return {
          label,
          icon: getIconName(icons[index]?.name),
        }
      }),
    )
  }

  return h(
    'UBreadcrumb',
    {
      items,
      separatorIcon:
        divider === 'Icon' ? getIconName(separatorIconName?.name) : undefined,
    },
    {
      separatorIcon: ui.icons.chevronRight,
    },
    divider === 'Span' && separatorSlot
      ? [renderSlot('separator', [separatorSlot])]
      : [],
  )
}
