import type { ButtonProps } from '@nuxt/ui'
import type { DesignComponent, TextNode } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { findOne } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { getIconName } from './icon'

const BUTTON_COLOR_MAP = {
  ButtonPrimary: 'primary',
  ButtonSecondary: 'secondary',
  ButtonSuccess: 'success',
  ButtonInfo: 'info',
  ButtonWarning: 'warning',
  ButtonError: 'error',
  ButtonNeutral: 'neutral',
} as const satisfies Record<string, ButtonProps['color']>

type ButtonName = keyof typeof BUTTON_COLOR_MAP

export const BUTTON_NAMES = Object.keys(BUTTON_COLOR_MAP) as ButtonName[]

export type ButtonProperties = {
  '◆ Variant': 'Solid' | 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'Link'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Disabled' | 'Focus' | 'Hover'
  '◆ Slot': 'Icon' | 'Avatar'
  '👁️ Square': 'False' | 'True'
  '👁️ Label'?: boolean
  '𝐓 LabelSlot'?: string
  '👁️ IconLeading'?: boolean
  '↳ IconLeadingName'?: DesignComponent<IconProperties>
  '👁️ IconTrailing'?: boolean
  '↳ IconTrailingName'?: DesignComponent<IconProperties>
  '👁️ AvatarLeading'?: boolean
  '👁️ AvatarTrailing'?: boolean
}

export function Button(
  component: DesignComponent<ButtonProperties>,
  defaults: Partial<ButtonProps> = {},
) {
  const { name, properties } = component

  const color = BUTTON_COLOR_MAP[name as ButtonName]

  const {
    variant,
    size,
    state,
    square,
    slot,
    iconLeading,
    iconLeadingName,
    iconTrailing,
    iconTrailingName,
    avatarLeading,
  } = cleanPropNames(properties)

  const icon =
    slot === 'Icon' && iconLeading
      ? getIconName(iconLeadingName?.name)
      : undefined
  const trailingIcon = iconTrailing
    ? getIconName(iconTrailingName?.name)
    : undefined
  const avatar =
    slot === 'Avatar' && avatarLeading ? getRandomAvatar() : undefined

  const label = findOne<TextNode>(component, {
    type: 'TEXT',
    visible: true,
  })?.characters

  return h(
    'UButton',
    {
      variant: toLowerCase(variant),
      color,
      size,
      square: square === 'True',
      icon,
      trailingIcon,
      avatar,
      disabled: state === 'Disabled',
    },
    {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      square: false,
      disabled: false,
      ...defaults,
    },
    label ? [label] : [],
  )
}

export function renderButtonItem(
  button: DesignComponent<ButtonProperties>,
  defaults: Partial<ButtonProps> = {},
): Partial<ButtonProps> {
  const { props, children } = Button(button, defaults)

  return {
    label:
      children
        .map((child) => (typeof child === 'string' ? child : undefined))
        .filter(Boolean)
        .join('') || undefined,
    ...props,
  }
}

export function renderButtonChild(button: DesignComponent<ButtonProperties>) {
  const {
    props: { size, ...rest },
    children,
  } = Button(button)

  return h('UButton', rest, children)
}
