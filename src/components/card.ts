import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import { findOne } from '@tempad-dev/plugins'
import { h, LOREM_IPSUM_TEXT, LOREM_IPSUM_TITLE, renderSlot } from '../utils'

export type CardProperties = {
  '❖ BodySlot': DesignComponent
  '❖ FooterSlot': DesignComponent
  '❖ HeaderSlot': DesignComponent
}

export function Card(component: DesignComponent<CardProperties>) {
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

  return h('UCard', {}, {}, [
    ...(header ? [renderSlot('header', [LOREM_IPSUM_TITLE])] : []),
    ...(body ? [LOREM_IPSUM_TEXT] : []),
    ...(footer ? [renderSlot('footer', [LOREM_IPSUM_TITLE])] : []),
  ])
}
