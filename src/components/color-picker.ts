import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'

export type ColorPickerProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled'
}

export function ColorPicker(component: DesignComponent<ColorPickerProperties>) {
  const { properties } = component

  const { size, state } = cleanPropNames(properties)

  return h(
    'UColorPicker',
    {
      size,
      disabled: state === 'Disabled',
    },
    {
      disabled: false,
    },
  )
}
