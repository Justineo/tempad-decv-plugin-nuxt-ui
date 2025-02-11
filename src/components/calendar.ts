import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type CalendarProperties = {
  '🎨 Color': 'Primary' | 'Neutral' | 'Secondary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ NumberOfMonths': '1' | '2' | '3'
  '👁️ monthControls': boolean
  '👁️ yearControls': boolean
}

export function Calendar(component: DesignComponent<CalendarProperties>) {
  const { properties } = component

  const { color, size, numberOfMonths, monthControls, yearControls } =
    cleanPropNames(properties)

  const months = Number(numberOfMonths)

  return h(
    'UCalendar',
    {
      color: toLowerCase(color),
      size,
      numberOfMonths: Number.isNaN(months) ? 1 : months,
      monthControls,
      yearControls,
    },
    {
      color: 'primary',
      size: 'md',
      numberOfMonths: 1,
      monthControls: true,
      yearControls: true,
    },
  )
}
