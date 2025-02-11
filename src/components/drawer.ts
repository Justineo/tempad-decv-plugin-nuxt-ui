import type {
  DesignComponent,
  DevComponent,
  FrameNode,
} from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChildren, findOne } from '@tempad-dev/plugins'
import {
  cleanPropNames,
  h,
  LOREM_IPSUM_TEXT,
  renderSlot,
  toLowerCase,
} from '../utils'
import { Button, BUTTON_NAMES } from './button'

export type DrawerProperties = {
  '⇅ Direction': 'Bottom' | 'Top' | 'Right' | 'Left'
  '👁️ Overlay': 'True' | 'False'
  '👁️ Handle': boolean
  '👁️ Heading': boolean
  '𝐓 Title': string
  '👁️ Description': boolean
  '↳ Description'?: string
  '◆ ContainerSlot': DesignComponent
  '👁️ Buttons': boolean
}

export function Drawer(component: DesignComponent<DrawerProperties>) {
  const { properties } = component

  const {
    direction,
    overlay,
    handle,
    heading,
    title,
    showDescription,
    description,
    buttons: showButtons,
  } = cleanPropNames(properties, {
    '👁️ Description': 'showDescription',
  })

  const children: DevComponent['children'] = [
    renderSlot('body', [LOREM_IPSUM_TEXT]),
  ]

  if (showButtons) {
    const buttonsContainer = findOne<FrameNode>(component, {
      type: 'FRAME',
      name: 'Buttons',
      visible: true,
    })
    const buttons = buttonsContainer
      ? findChildren<DesignComponent<ButtonProperties>>(buttonsContainer, {
          type: 'INSTANCE',
          name: BUTTON_NAMES,
          visible: true,
        })
      : []
    if (buttons.length > 0) {
      const buttonComponents = buttons.map((button) => {
        const buttonComponent = Button(button)
        buttonComponent.props.class = 'justify-center'
        return buttonComponent
      })

      children.push(renderSlot('footer', buttonComponents))
    }
  }

  return h(
    'UDrawer',
    {
      title: heading ? title : undefined,
      description: showDescription ? description : undefined,
      overlay: overlay === 'True',
      handle,
      direction: toLowerCase(direction),
    },
    {
      overlay: true,
      handle: true,
      direction: 'bottom',
    },
    children,
  )
}
