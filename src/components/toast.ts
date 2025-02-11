import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChild, findChildren, findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'
import { getIconName } from './icon'

export type ToastProperties = {
  '🎨 Color':
    | 'Primary'
    | 'Neutral'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None'
  '𝐓 Description'?: string
  '👁️ Actions': 'False' | 'True'
  '◆ Progress': '0' | '100'
  '𝐓 Title': string
  '👁️ Description': 'False' | 'True'
  '🙂 LeadingIconName'?: DesignComponent
}

export function Toast(component: DesignComponent<ToastProperties>) {
  const { properties } = component

  const {
    color,
    leadingSlot,
    description,
    actions: showActions,
    title,
    showDescription,
    leadingIconName,
  } = cleanPropNames(properties, {
    '👁️ Description': 'showDescription',
  })

  const content = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'Content',
    visible: true,
  })
  const button = findChild<DesignComponent<ButtonProperties>>(
    content || component,
    {
      type: 'INSTANCE',
      name: BUTTON_NAMES,
    },
  )
  const close = button
    ? renderButtonItem(button, {
        size: 'md',
        color: 'neutral',
        variant: 'link',
      })
    : false
  const closeIcon = close ? close.icon : undefined

  const actionSection = showActions
    ? findOne<FrameNode>(component, {
        type: 'FRAME',
        name: 'Actions',
      })
    : null
  const actionButtons: DesignComponent<ButtonProperties>[] = actionSection
    ? findChildren<DesignComponent<ButtonProperties>>(actionSection, {
        type: 'INSTANCE',
        name: BUTTON_NAMES,
      }) || []
    : []
  const actions = actionButtons.map((button) => renderButtonItem(button))

  return h(
    'UToast',
    {
      title,
      description: (showDescription && description) || undefined,
      icon:
        leadingSlot === 'Icon' ? getIconName(leadingIconName?.name) : undefined,
      avatar: leadingSlot === 'Avatar' ? getRandomAvatar() : undefined,
      color: toLowerCase(color),
      close,
      closeIcon,
      actions: actions.length > 0 ? actions : undefined,
    },
    {
      color: 'primary',
      close: true,
      closeIcon: ui.icons.close,
    },
  )
}
