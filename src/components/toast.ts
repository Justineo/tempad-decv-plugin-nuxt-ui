import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import type { IconProperties } from './icon'
import { findChild, queryAll } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'
import { getIconName } from './icon'

export type ToastProperties = {
  '🙂 LeadingIconName': DesignComponent<IconProperties>
  '𝐓 Description': string
  '𝐓 Title': string
  '🎨 Color':
    | 'Primary'
    | 'Neutral'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '◆ LeadingSlot': 'Avatar' | 'Icon' | 'None'
  '👁️ Description': 'False' | 'True'
  '👁️ Actions': 'False' | 'True'
  '◆ Progress': '0' | '100'
}

export function Toast(component: DesignComponent<ToastProperties>) {
  const {
    color,
    leadingSlot,
    description,
    title,
    showDescription,
    leadingIconName,
  } = cleanPropNames(component.properties, {
    '👁️ Description': 'showDescription',
  })

  const content = findChild<FrameNode>(component, {
    type: 'FRAME',
    name: 'Content',
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

  const actions = queryAll<DesignComponent<ButtonProperties>>(component, [
    { query: 'one', type: 'FRAME', name: 'Actions' },
    { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
  ]).map((button) =>
    renderButtonItem(button, {
      size: 'xs',
    }),
  )

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
