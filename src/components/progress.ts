import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type ProgressProperties = {
  '🎨 Color':
    | 'Neutral'
    | 'Primary'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '📏 Size': '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '◆ Value': '0%' | '25%' | '50%' | '75%' | '100%'
  '👁️ Indicator': boolean
}

export function Progress(component: DesignComponent<ProgressProperties>) {
  const { properties } = component

  const { color, size, orientation, value, indicator } =
    cleanPropNames(properties)

  return h(
    'UProgress',
    {
      modelValue: Number.parseInt(value, 10),
      status: indicator,
      size,
      color: toLowerCase(color),
      orientation: toLowerCase(orientation),
    },
    {
      status: false,
      size: 'md',
      color: 'primary',
      orientation: 'horizontal',
    },
  )
}
