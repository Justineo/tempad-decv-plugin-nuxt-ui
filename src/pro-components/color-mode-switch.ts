import type { DesignComponent } from '@tempad-dev/plugins'
import type { SwitchProperties } from '../components/switch'
import { pick } from '@s-libs/micro-dash'
import { findChild } from '@tempad-dev/plugins'
import { Switch } from '../components/switch'
import { h } from '../utils'

export type ColorModeSwitchProperties = {
  ColorMode: 'Dark' | 'Light'
}

export function ColorModeSwitch(component: DesignComponent<ColorModeSwitchProperties>) {
  const switcher = findChild<DesignComponent<SwitchProperties>>(component, {
    type: 'INSTANCE',
    name: 'Switch',
  })

  const { props = {} } = switcher ? Switch(switcher) : {}

  return h('UColorModeSwitch', pick(props, 'disabled', 'color', 'size'), {})
}
