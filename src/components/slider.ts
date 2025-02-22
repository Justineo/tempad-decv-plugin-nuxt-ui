import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type SliderProperties = {
  '👁️ Indicator2': boolean
  '🎨 Color': 'Error' | 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '🚦 State': 'Default' | 'Disabled'
  '◆ IndicatorPosition': '0' | '25' | '50' | '75' | '100'
}

export function Slider(component: DesignComponent<SliderProperties>) {
  const { color, size, orientation, state, indicatorPosition, indicator2 } = cleanPropNames(component.properties)

  const value = Number(indicatorPosition)

  return h(
    'USlider',
    {
      modelValue: indicator2 ? [0, value] : value,
      color: toLowerCase(color),
      size,
      orientation: toLowerCase(orientation),
      disabled: state === 'Disabled',
    },
    {
      color: 'primary',
      size: 'md',
      orientation: 'horizontal',
      disabled: false,
    },
  )
}
