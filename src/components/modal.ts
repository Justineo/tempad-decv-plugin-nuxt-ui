import type { DesignComponent } from '@tempad-dev/plugins'
import {
  cleanPropNames,
  h,
  LOREM_IPSUM_TEXT,
  LOREM_IPSUM_TITLE,
  renderSlot,
} from '../utils'

export type ModalProperties = {
  '👁️ Footer': boolean
  '↳  BodySlot': DesignComponent
  '👁️ Header': boolean
  '👁️ Body': boolean
  '↳  FooterSlot': DesignComponent
  '↳  HeaderSlot': DesignComponent
  '👁️  Background': 'False' | 'True'
}

export function Modal(component: DesignComponent<ModalProperties>) {
  const { header, body, footer } = cleanPropNames(component.properties)

  return h('UModal', {}, {}, [
    ...(header ? [renderSlot('header', [LOREM_IPSUM_TITLE])] : []),
    ...(body ? [renderSlot('body', [LOREM_IPSUM_TEXT])] : []),
    ...(footer ? [renderSlot('footer', [LOREM_IPSUM_TITLE])] : []),
  ])
}
