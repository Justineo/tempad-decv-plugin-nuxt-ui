import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { queryAll } from '@tempad-dev/plugins'
import {
  cleanPropNames,
  h,
  LOREM_IPSUM_TEXT,
  renderSlot,
  toLowerCase,
} from '../utils'
import { Button, BUTTON_NAMES } from './button'

export type DrawerProperties = {
  '◆ ContainerSlot': DesignComponent
  '👁️ Heading': boolean
  '↳ Description': string
  '👁️ Description': boolean
  '👁️ Handle': boolean
  '𝐓 Title': string
  '👁️ Buttons': boolean
  '⇅ Direction': 'Bottom' | 'Top' | 'Right' | 'Left'
  '👁️ Overlay': 'True' | 'False'
}

export function Drawer(component: DesignComponent<DrawerProperties>) {
  const {
    direction,
    overlay,
    handle,
    heading,
    title,
    showDescription,
    description,
    buttons: showButtons,
  } = cleanPropNames(component.properties, {
    '👁️ Description': 'showDescription',
  })

  const children: DevComponent['children'] = [
    renderSlot('body', [LOREM_IPSUM_TEXT]),
  ]

  if (showButtons) {
    const buttons = queryAll<DesignComponent<ButtonProperties>>(component, [
      { query: 'one', type: 'FRAME', name: 'Buttons' },
      { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
    ])

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
