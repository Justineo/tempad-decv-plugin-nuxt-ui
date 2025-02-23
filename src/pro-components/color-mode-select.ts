import type { DesignComponent } from '@tempad-dev/plugins'
import type { SelectMenuProperties } from '../components/select-menu'
import { omit } from '@s-libs/micro-dash'
import { findChild } from '@tempad-dev/plugins'
import { SelectMenu } from '../components/select-menu'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type ColorModeSelectProperties = {}

export function ColorModeSelect(component: DesignComponent<ColorModeSelectProperties>) {
  const menu = findChild<DesignComponent<SelectMenuProperties>>(component, {
    type: 'INSTANCE',
    name: 'SelectMenu',
  })

  const { props = {} } = menu ? SelectMenu(menu) : {}

  return h('UColorModeSelect', omit(props, 'items', 'icon'), {})
}
