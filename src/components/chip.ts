import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type ChipProperties = {
  '↳ Label': string
  Color: 'Primary' | 'Secondary' | 'Success' | 'Info' | 'Warning' | 'Error'
  '📏 Size': '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  '👁️ IsLabel': 'True' | 'False'
}

export function Chip(component: DesignComponent<ChipProperties>) {
  const { color, size, isLabel, label } = cleanPropNames(component.properties)

  return h(
    'UChip',
    {
      text: isLabel === 'True' ? label : undefined,
      color: toLowerCase(color),
      size,
    },
    {
      color: 'primary',
      size: 'md',
    },
  )
}
