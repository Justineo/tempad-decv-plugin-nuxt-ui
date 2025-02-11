import type { PopoverProps } from '@nuxt/ui'
import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChild } from '@tempad-dev/plugins'
import {
  cleanPropNames,
  h,
  LOREM_IPSUM_TEXT,
  pick,
  renderSlot,
  toLowerCase,
} from '../utils'
import { Button, BUTTON_NAMES } from './button'

export type PopoverProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '⇅ Position': 'Bottom' | 'Left' | 'Right' | 'Top'
  '👁️ Arrow': 'False' | 'True'
  '◆ Slot': DesignComponent
  '👁️ IsOpen': boolean
}

export function Popover(component: DesignComponent<PopoverProperties>) {
  const { properties } = component

  const { position, arrow } = cleanPropNames(properties)

  const content: PopoverProps['content'] = pick(
    {
      side: toLowerCase(position),
    },
    {
      side: 'bottom',
    },
  )

  const children: DevComponent['children'] = [
    renderSlot('content', [LOREM_IPSUM_TEXT]),
  ]

  const trigger = findChild<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
    visible: true,
  })

  if (trigger) {
    children.unshift(Button(trigger))
  }

  return h(
    'UPopover',
    {
      content,
      arrow: arrow === 'True',
    },
    {
      arrow: false,
    },
    children,
  )
}
