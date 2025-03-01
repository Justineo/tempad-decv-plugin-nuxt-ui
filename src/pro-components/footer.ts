import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { NavigationMenuProperties } from '../components/navigation-menu'
import { queryAll, queryOne } from '@tempad-dev/plugins'
import { Button, BUTTON_NAMES } from '../components/button'
import { NavigationMenu } from '../components/navigation-menu'
import { h, renderSlot } from '../utils'

export type FooterProperties = {
  '👁️ Top': boolean
  '👁️ Default': boolean
  '👁️ RightSlot': boolean
  '👁️ Bottom': boolean
  '👁️ LeftSlot': boolean
  '🖥️ Device': 'Mobile' | 'Desktop'
}

export function Footer(component: DesignComponent<FooterProperties>) {
  const left = queryOne<TextNode>(component, [
    { query: 'child', type: 'FRAME', name: 'LeftSlot' },
    { query: 'child', type: 'TEXT' },
  ])?.characters

  const right = queryAll<DesignComponent<ButtonProperties>>(component, [
    { query: 'child', type: 'FRAME', name: 'RightSlot' },
    { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
  ]).map((button) => Button(button))

  const menu = queryOne<DesignComponent<NavigationMenuProperties>>(component, [
    { query: 'child', type: 'FRAME', name: 'Default' },
    { query: 'child', type: 'INSTANCE', name: 'NavigationMenu' },
  ])

  return h('UFooter', {}, {}, [
    ...(left ? [renderSlot('left', [left])] : []),
    ...(menu ? [NavigationMenu(menu)] : []),
    ...(right.length ? [renderSlot('right', right)] : []),
  ])
}
