import type { DesignComponent } from '@tempad-dev/plugins'
import {
  cleanPropNames,
  h,
  LOREM_IPSUM_TEXT,
  LOREM_IPSUM_TITLE,
  renderSlot,
} from '../utils'

export type ModalProperties = {
  '👁️  Background': 'False' | 'True'
  '👁️ Header': boolean
  '↳  HeaderSlot'?: DesignComponent
  '👁️ Body': boolean
  '↳  BodySlot'?: DesignComponent
  '👁️ Footer': boolean
  '↳  FooterSlot'?: DesignComponent
}

export function Modal(component: DesignComponent<ModalProperties>) {
  const { properties } = component

  const { header, body, footer } = cleanPropNames(properties)

  return h('UModal', {}, {}, [
    ...(header ? [renderSlot('header', [LOREM_IPSUM_TITLE])] : []),
    ...(body ? [renderSlot('body', [LOREM_IPSUM_TEXT])] : []),
    ...(footer ? [renderSlot('footer', [LOREM_IPSUM_TITLE])] : []),
  ])
}
