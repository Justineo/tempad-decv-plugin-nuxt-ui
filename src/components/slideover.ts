import type { DesignComponent, DevComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChild, findChildren, findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, LOREM_IPSUM_TEXT, LOREM_IPSUM_TITLE, renderSlot, toLowerCase } from '../utils'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'

export type SlideoverProperties = {
  '◆ FooterSlot': DesignComponent
  '◆ BodySlot': DesignComponent
  '◆ Variant': 'Bottom' | 'Top' | 'Left' | 'Right'
  '👁️ Overlay': 'True' | 'False'
}

export function Slideover(component: DesignComponent<SlideoverProperties>) {
  const { variant, overlay } = cleanPropNames(component.properties)

  const header = findOne<FrameNode>(component, {
    type: 'FRAME',
    name: 'Header',
  })

  const body = findOne<FrameNode>(component, {
    type: 'FRAME',
    name: 'Body',
  })

  const footer = findOne<FrameNode>(component, {
    type: 'FRAME',
    name: 'Footer',
  })

  const titleAndDesc = findOne<FrameNode>(component, {
    type: 'FRAME',
    name: 'Title and description',
  })

  const closeButton = header
    ? findChild<DesignComponent<ButtonProperties>>(header, {
        type: 'INSTANCE',
        name: BUTTON_NAMES,
      })
    : undefined
  const closeProps = closeButton
    ? renderButtonItem(closeButton, {
        size: 'md',
        color: 'neutral',
        variant: 'ghost',
      })
    : false

  const { icon: closeIcon, square, ...close } = closeProps || {}

  const [title, desc] = titleAndDesc
    ? findChildren<TextNode>(titleAndDesc, {
        type: 'TEXT',
      })
    : []

  const children: DevComponent['children'] = []

  if (body) {
    children.push(renderSlot('body', [LOREM_IPSUM_TEXT]))
  }

  if (footer) {
    children.push(renderSlot('footer', [LOREM_IPSUM_TITLE]))
  }

  return h(
    'USlideover',
    {
      title: title?.characters,
      description: desc?.characters,
      overlay: overlay === 'True',
      side: toLowerCase(variant),
      close: closeProps ? (Object.keys(close).length > 0 ? close : true) : false,
      closeIcon,
    },
    {
      overlay: true,
      side: 'right',
      close: true,
      closeIcon: ui.icons.close,
    },
    children,
  )
}
