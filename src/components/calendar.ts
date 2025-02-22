import type { DesignComponent } from '@tempad-dev/plugins'
import type { CalendarProps } from '../types'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type CalendarItemProperties = {
  '𝐓 DateValue': string
  '👁️ Chip': boolean
  '🎨 Color': 'Primary' | 'Neutral' | 'Secondary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Data' | 'Data-disabled' | 'Data-unavailable' | 'Data-today' | 'Data-selected'
  '🚦 State': 'Default' | 'Highlighted'
}

export type CalendarItem = Pick<CalendarProps, 'color'> & {
  selected?: boolean
  date: number
}

export function renderCalendarItem(item: DesignComponent<CalendarItemProperties>): CalendarItem {
  const { color, variant, dateValue } = cleanPropNames(item.properties)

  const date = Number(dateValue)

  return {
    color: toLowerCase(color),
    selected: variant === 'Data-selected',
    date: Number.isNaN(date) ? 0 : date,
  }
}

export type CalendarProperties = {
  '👁️ yearControls': boolean
  '👁️ monthControls': boolean
  '🎨 Color': 'Primary' | 'Neutral' | 'Secondary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ NumberOfMonths': '1' | '2' | '3'
}

export function Calendar(component: DesignComponent<CalendarProperties>) {
  const { color, size, numberOfMonths, monthControls, yearControls } = cleanPropNames(component.properties)

  const months = Number(numberOfMonths)

  const items = findAll<DesignComponent<CalendarItemProperties>>(component, {
    type: 'INSTANCE',
    name: 'calendar-item',
  }).map((child) => renderCalendarItem(child))

  const { range, multiple } = checkSelection(items)

  return h(
    'UCalendar',
    {
      color: toLowerCase(color),
      size,
      range,
      multiple,
      numberOfMonths: Number.isNaN(months) ? 1 : months,
      monthControls,
      yearControls,
    },
    {
      color: 'primary',
      size: 'md',
      range: false,
      multiple: false,
      numberOfMonths: 1,
      monthControls: true,
      yearControls: true,
    },
  )
}

function checkSelection(items: CalendarItem[]): {
  range: boolean
  multiple: boolean
} {
  let lastSelectedIndex = -1

  for (let i = 0; i < items.length; i++) {
    if (items[i]!.selected) {
      // Check for non-consecutive selections
      if (lastSelectedIndex !== -1 && i - lastSelectedIndex > 1) {
        return { range: false, multiple: true }
      }

      // Check for consecutive selections
      if (i > 0 && items[i - 1]!.selected) {
        return { range: true, multiple: false }
      }

      lastSelectedIndex = i // Update the index of the last selected item
    }
  }

  return { range: false, multiple: false }
}
