import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { ButtonProps } from '../types'
import { findChild } from '@tempad-dev/plugins'
import { Button, BUTTON_NAMES } from '../components/button'
import { ui } from '../components/config'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type ContentSearchButtonProperties = {}

export function ContentSearchButton(component: DesignComponent<ContentSearchButtonProperties>) {
  const button = findChild<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
  })

  const props: Partial<ButtonProps> = button ? Button(button).props : {}

  const { icon, label, color, variant, size, disabled } = props

  return h(
    'UContentSearchButton',
    {
      icon,
      label,
      color,
      variant,
      size,
      disabled,
    },
    {
      icon: ui.icons.search,
      color: 'neutral',
      variant: 'ghost',
    },
  )
}
