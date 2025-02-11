import type { InputProps } from '@nuxt/ui'
import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { cleanPropNames, h, renderSlot, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { getIconName } from './icon'

const INPUT_VARIANT_MAP = {
  InputOutline: 'outline',
  InputSoft: 'soft',
  InputNone: 'none',
  InputGhost: 'ghost',
  InputSubtle: 'subtle',
} as const satisfies Record<string, InputProps['variant']>

type InputName = keyof typeof INPUT_VARIANT_MAP

export const INPUT_NAMES = Object.keys(INPUT_VARIANT_MAP) as InputName[]

export type InputProperties = {
  '🎨 Color': 'Neutral' | 'Primary' | 'Error'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Hover (focus)' | 'Disabled' | 'Focus'
  '◆ LeadingSlot': 'Icon' | 'Span' | 'Avatar' | 'None'
  '◆ TrailingSlot': 'Icon' | 'Span' | 'None'
  '👁️ Placeholder': boolean
  '↳ PlaceholderLabel'?: string
  '👁️ Completed': boolean
  '↳ CompletedLabel'?: string
  '🙂 IconLeadingName'?: DesignComponent<IconProperties>
  '🙂 IconTrailingName'?: DesignComponent<IconProperties>
  '𝐓 Span'?: string
}

export function Input(
  component: DesignComponent<InputProperties>,
  defaults: Partial<InputProps> = {},
) {
  const { name, properties } = component

  const variant = INPUT_VARIANT_MAP[name as InputName]

  const {
    color,
    size,
    state,
    leadingSlot,
    trailingSlot,
    placeholder,
    placeholderLabel,
    completed,
    completedLabel,
    iconLeadingName,
    iconTrailingName,
    span,
  } = cleanPropNames(properties)

  const icon =
    leadingSlot === 'Icon' ? getIconName(iconLeadingName?.name) : undefined
  const trailingIcon =
    trailingSlot === 'Icon' ? getIconName(iconTrailingName?.name) : undefined

  const avatar = leadingSlot === 'Avatar' ? getRandomAvatar() : undefined

  const children: DevComponent['children'] = []

  if (leadingSlot === 'Span' && span) {
    children.push(renderSlot('leading', [span]))
  } else if (trailingSlot === 'Span' && span) {
    children.push(renderSlot('trailing', [span]))
  }

  return h(
    'UInput',
    {
      type:
        completed && completedLabel && /^\*+$/.test(completedLabel)
          ? 'password'
          : 'text',
      placeholder: placeholder ? placeholderLabel : undefined,
      color: toLowerCase(color),
      variant,
      size,
      icon,
      trailingIcon,
      avatar,
      disabled: state === 'Disabled',
    },
    {
      type: 'text',
      color: 'primary',
      variant: 'outline',
      size: 'md',
      disabled: false,
      ...defaults,
    },
    children,
  )
}
