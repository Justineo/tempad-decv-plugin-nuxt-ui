import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { DrawerProperties } from '../components/drawer'
import type { ModalProperties } from '../components/modal'
import type { NavigationMenuProperties } from '../components/navigation-menu'
import type { SlideoverProperties } from '../components/slideover'
import type { HeaderProps } from '../types'
import { h as createElement, findChild, findOne, queryAll } from '@tempad-dev/plugins'
import { Button, BUTTON_NAMES } from '../components/button'
import { Drawer } from '../components/drawer'
import { Modal } from '../components/modal'
import { NavigationMenu } from '../components/navigation-menu'
import { Slideover } from '../components/slideover'
import { cleanPropNames, h, renderSlot, toLowerCase } from '../utils'

export type HeaderProperties = {
  '👁️ RightSlot': boolean
  '👁️ Default': boolean
  '↳ Title': string
  '👁️ LeftSlot': boolean
  '◆ Mode': 'Desktop' | 'Drawer' | 'Slideover' | 'Modal' | 'Mobile'
  '◆ Variant': 'Title' | 'Logo'
}

function isSupportedMode(mode: string): mode is NonNullable<HeaderProps['mode']> {
  return ['drawer', 'slideover', 'modal'].includes(mode)
}

export function Header(component: DesignComponent<HeaderProperties>) {
  const { title, leftSlot, mode: modeVariant, variant } = cleanPropNames(component.properties)

  const mode = toLowerCase(modeVariant)
  const supported = isSupportedMode(mode)

  const container = supported
    ? findChild<FrameNode>(component, {
        type: 'FRAME',
        name: 'Header',
      })!
    : component

  const left = variant === 'Logo' ? createElement('Logo') : null

  const right = queryAll<DesignComponent<ButtonProperties>>(container, [
    { query: 'child', type: 'FRAME', name: 'RightSlot' },
    { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
  ]).map((button) => Button(button))

  const navMenu = findOne<DesignComponent<NavigationMenuProperties>>(component, {
    type: 'INSTANCE',
    name: 'NavigationMenu',
  })

  let menu
  if (isSupportedMode(mode)) {
    switch (mode) {
      case 'modal': {
        const modal = findChild<DesignComponent<ModalProperties>>(component, {
          type: 'INSTANCE',
          name: 'Modal',
        })
        menu = (modal ? Modal(modal) : {}).props
        break
      }
      case 'slideover': {
        const slideover = findChild<DesignComponent<SlideoverProperties>>(component, {
          type: 'INSTANCE',
          name: 'Slideover',
        })
        menu = (slideover ? Slideover(slideover) : {}).props
        break
      }
      case 'drawer': {
        const drawer = findChild<DesignComponent<DrawerProperties>>(component, {
          type: 'INSTANCE',
          name: 'Drawer',
        })
        menu = (drawer ? Drawer(drawer) : {}).props
        break
      }
    }
  }

  return h(
    'UHeader',
    {
      title: (leftSlot && title) || '',
      mode: supported ? mode : undefined,
      menu,
    },
    {
      title: 'Nuxt UI Pro',
      mode: 'modal',
    },
    [
      ...(left ? [renderSlot('left', [left])] : []),
      ...(navMenu ? [NavigationMenu(navMenu)] : []),
      ...(right.length ? [renderSlot('right', right)] : []),
    ],
  )
}
