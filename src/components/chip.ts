import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type ChipProperties = {
  Color: 'Primary' | 'Secondary' | 'Success' | 'Info' | 'Warning' | 'Error'
  '📏 Size': '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  '👁️ IsLabel': 'True' | 'False'
  '↳ Label'?: string
}

export function Chip(component: DesignComponent<ChipProperties>) {
  const { properties } = component

  const { color, size, isLabel, label } = cleanPropNames(properties)

  return h(
    'UChip',
    {
      text: isLabel ? label : undefined,
      color: toLowerCase(color),
      size,
    },
    {
      color: 'primary',
      size: 'md',
    },
  )
}
