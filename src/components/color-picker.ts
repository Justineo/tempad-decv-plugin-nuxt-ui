import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'

export type ColorPickerProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled'
}

export function ColorPicker(component: DesignComponent<ColorPickerProperties>) {
  const { size, state } = cleanPropNames(component.properties)

  return h(
    'UColorPicker',
    {
      size,
      disabled: state === 'Disabled',
    },
    {
      size: 'md',
      disabled: false,
    },
  )
}
