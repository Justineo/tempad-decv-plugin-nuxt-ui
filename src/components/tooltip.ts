import type { TooltipProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, pickOverrides, toLowerCase } from '../utils'
import { getKbdItems } from './kbd'

const SIDE_MAP = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
  none: 'bottom',
} as const

export type TooltipProperties = {
  '◆ ArrowPlacement': 'Bottom' | 'Left' | 'None' | 'Right' | 'Top'
  '𝐓 Label': string
}

export function Tooltip(component: DesignComponent<TooltipProperties>) {
  const { properties } = component

  const { arrowPlacement, label } = cleanPropNames(properties)

  const content: TooltipProps['content'] = pickOverrides(
    {
      side: SIDE_MAP[toLowerCase(arrowPlacement)],
    },
    {
      side: 'bottom',
    },
  )

  const kbds = getKbdItems(component, {
    size: 'sm',
  })

  return h(
    'UTooltip',
    {
      text: label,
      content,
      arrow: arrowPlacement !== 'None',
      kbds,
    },
    {
      arrow: false,
    },
  )
}
