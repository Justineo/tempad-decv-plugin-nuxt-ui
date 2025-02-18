import type { SelectItem, SelectProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getRandomAvatar } from './avatar'
import { ui } from './config'
import { getIconName } from './icon'

const SELECT_VARIANT_MAP: Record<string, SelectProps<SelectItem>['variant']> = {
  SelectOutline: 'outline',
  SelectSoft: 'soft',
  SelectNone: 'none',
  SelectGhost: 'ghost',
  SelectSubtle: 'subtle',
}

type SelectName = keyof typeof SELECT_VARIANT_MAP

export const SELECT_NAMES = Object.keys(SELECT_VARIANT_MAP) as SelectName[]

export type SelectProperties = {
  '🙂 IconTrailingName': DesignComponent<IconProperties>
  '🙂 IconLeadingName': DesignComponent<IconProperties>
  '👁️ Completed': boolean
  '↳ CompletedLabel': string
  '👁️ Placeholder': boolean
  '↳ PlaceholderLabel': string
  '🎨 Color': 'Neutral' | 'Primary' | 'Error'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Focus' | 'Disabled'
  '◆ LeadingSlot': 'Icon' | 'Avatar' | 'None' | 'Span'
}

export function Select(
  component: DesignComponent<SelectProperties>,
  defaults: Partial<SelectProps<SelectItem>> = {},
) {
  const variant = SELECT_VARIANT_MAP[component.name]

  const {
    color,
    size,
    state,
    leadingSlot,
    placeholder,
    placeholderLabel,
    iconLeadingName,
    iconTrailingName,
  } = cleanPropNames(component.properties)

  const icon =
    leadingSlot === 'Icon' ? getIconName(iconLeadingName?.name) : undefined
  const trailingIcon = getIconName(iconTrailingName?.name)

  const avatar = leadingSlot === 'Avatar' ? getRandomAvatar() : undefined

  return h(
    'USelect',
    {
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
      color: 'primary',
      variant: 'outline',
      size: 'md',
      trailingIcon: ui.icons.chevronDown,
      disabled: false,
      ...defaults,
    },
  )
}
