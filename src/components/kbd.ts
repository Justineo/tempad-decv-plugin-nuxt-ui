import type { KbdProps } from '@nuxt/ui'
import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick, toLowerCase } from '../utils'

export const kbdGlyphsMap: Record<string, string> = {
  '⌘': 'meta',
  '⌃': 'ctrl',
  '⌥': 'alt',
  '⊞': 'win',
  '⇧': 'shift',
  '↵': 'enter',
  '⌦': 'delete',
  '⌫': 'backspace',
  '⎋': 'escape',
  '⇥': 'tab',
  '⇪': 'capslock',
  '↑': 'arrowup',
  '→': 'arrowright',
  '↓': 'arrowdown',
  '←': 'arrowleft',
  '⇞': 'pageup',
  '⇟': 'pagedown',
  '↖': 'home',
  '↘': 'end',
}

export type KbdProperties = {
  '📏 Size': 'sm' | 'md' | 'lg'
  '◆ Variant': 'Solid' | 'Subtle' | 'Outline'
  '𝐓 Label':
    | '←'
    | '↑'
    | '→'
    | '↓'
    | '↖'
    | '↘'
    | '⇧'
    | '⇪'
    | '⌃'
    | '⌘'
    | '⌥'
    | '⌦'
    | '⌫'
    | '⎇'
    | '⎋'
}

export function Kbd(component: DesignComponent<KbdProperties>) {
  const { properties } = component

  const { size, variant } = cleanPropNames(properties)

  const text = findChild<TextNode>(component, {
    type: 'TEXT',
    visible: true,
  })?.characters

  return h(
    'UKbd',
    {
      value: text ? kbdGlyphsMap[text] || text : undefined,
      variant: toLowerCase(variant),
      size,
    },
    {
      variant: 'outline',
      size: 'md',
    },
  )
}

export function renderKbdItem(
  kbd: DesignComponent<KbdProperties>,
  defaults: Partial<KbdProps> = {},
): Partial<KbdProps> {
  const { props } = Kbd(kbd)

  return pick(props, defaults)
}

export function getKbdItems(
  menuItem: DesignComponent,
  defaults: Partial<KbdProps> = {},
): string[] | KbdProps[] | undefined {
  const kbdsContainer = findChild<FrameNode>(menuItem, {
    type: 'FRAME',
    name: 'Kbd',
    visible: true,
  })

  if (kbdsContainer) {
    const kbds = findChildren<DesignComponent<KbdProperties>>(kbdsContainer, {
      type: 'INSTANCE',
      name: 'Kbd',
      visible: true,
    }).map((kbd) => renderKbdItem(kbd, defaults))

    if (kbds.length === 0) {
      return undefined
    }

    if (kbds.every((kbd) => Object.keys(kbd).length === 1 && kbd.value)) {
      return kbds.map((kbd) => kbd.value!)
    }

    return kbds
  }

  return undefined
}
