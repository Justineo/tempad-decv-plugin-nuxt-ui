import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import { findChild, findChildren, findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'
import { getIconName } from './icon'

export type AlertProperties = {
  '🎨 Color':
    | 'Neutral'
    | 'Primary'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '◆ Variant': 'Solid' | 'Outline' | 'Soft' | 'Subtle'
  '◆ LeadingSlot': 'Avatar' | 'Icon'
  '👁️ Description': 'True' | 'False'
  '👁️ Action': 'True' | 'False'
  '𝐓 Title': string
  '𝐓 Description'?: string
  '👁️ CloseButton': boolean
  '👁️ Icon': boolean
  '↳ IconName'?: DesignComponent<IconProperties>
}

export function Alert(component: DesignComponent<AlertProperties>) {
  const { properties } = component

  const {
    color,
    variant,
    leadingSlot,
    showDescription,
    action,
    title,
    description,
    closeButton,
    icon,
    iconName,
  } = cleanPropNames(properties, {
    '👁️ Description': 'showDescription',
  })

  const button = findChild<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
    visible: true,
  })
  const close =
    closeButton && button
      ? renderButtonItem(button, {
          size: 'md',
          color: 'neutral',
          variant: 'link',
        })
      : false
  const closeIcon = close ? close.icon : undefined

  const actionSection = action
    ? findOne<FrameNode>(component, {
        type: 'FRAME',
        name: 'Actions',
        visible: true,
      })
    : null
  const actionButtons: DesignComponent<ButtonProperties>[] = actionSection
    ? findChildren<DesignComponent<ButtonProperties>>(actionSection, {
        type: 'INSTANCE',
        name: BUTTON_NAMES,
      }) || []
    : []
  const actions = actionButtons.map((button) =>
    renderButtonItem(button, {
      size: 'xs',
    }),
  )

  return h(
    'UAlert',
    {
      title,
      description: (showDescription && description) || undefined,
      icon:
        leadingSlot === 'Icon' && icon
          ? getIconName(iconName?.name)
          : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      color: toLowerCase(color),
      variant: toLowerCase(variant),
      close,
      closeIcon,
      actions: actions.length > 0 ? actions : undefined,
    },
    {
      color: 'primary',
      variant: 'solid',
      close: false,
      closeIcon: ui.icons.close,
    },
  )
}
