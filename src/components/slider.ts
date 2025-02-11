import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type SliderProperties = {
  '🎨 Color': 'Error' | 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '🚦 State': 'Default' | 'Disabled'
  '◆ IndicatorPosition': '0' | '25' | '50' | '75' | '100'
  '👁️ Indicator2': boolean
}

export function Slider(component: DesignComponent<SliderProperties>) {
  const { properties } = component

  const { color, size, orientation, state, indicatorPosition, indicator2 } =
    cleanPropNames(properties)

  const value = Number(indicatorPosition)

  return h(
    'USlider',
    {
      // @ts-expect-error: TS2353 because modelValue is defined with `defineModel` thus not in the props
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
