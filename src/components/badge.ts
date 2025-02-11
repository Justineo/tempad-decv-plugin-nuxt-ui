import type { BadgeProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getIconName } from './icon'

export type BadgeProperties = {
  '🎨 Color':
    | 'Neutral'
    | 'Primary'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '◆ Variant': 'Outline' | 'Soft' | 'Solid' | 'Subtle'
  '📏 Size': 'xs' | 'sm' | 'md'
  '👁️ RoundedFull': 'False' | 'True'
  '𝐓 Label': string
  '👁️ IconLeading': boolean
  '↳ IconLeadingName'?: DesignComponent<IconProperties>
  '👁️ IconTrailing': boolean
  '↳ IconTrailingName'?: DesignComponent<IconProperties>
}

export function Badge(
  component: DesignComponent<BadgeProperties>,
  defaults: Partial<BadgeProps> = {},
) {
  const { properties } = component

  const {
    color,
    variant,
    size,
    roundedFull,
    label,
    iconLeading,
    iconLeadingName,
    iconTrailing,
    iconTrailingName,
  } = cleanPropNames(properties)

  const iconProps: Partial<BadgeProps> =
    iconLeading && iconTrailing
      ? {
          leadingIcon: getIconName(iconLeadingName?.name),
          trailingIcon: getIconName(iconTrailingName?.name),
        }
      : {
          icon: iconLeading
            ? getIconName(iconLeadingName?.name)
            : iconTrailing
              ? getIconName(iconTrailingName?.name)
              : undefined,
          trailing: iconTrailing,
        }

  return h(
    'UBadge',
    {
      class: roundedFull === 'True' ? 'rounded-full' : undefined,
      color: toLowerCase(color),
      variant: toLowerCase(variant),
      size,
      ...iconProps,
    },
    {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      trailing: false,
      ...defaults,
    },
    label ? [label] : [],
  )
}

export function renderBadgeItem(
  badge: DesignComponent<BadgeProperties>,
  defaults: Partial<BadgeProps> = {},
): Partial<BadgeProps> {
  const { props, children } = Badge(badge, defaults)

  return {
    label:
      children
        .map((child) => (typeof child === 'string' ? child : undefined))
        .filter(Boolean)
        .join('') || undefined,
    ...props,
  }
}
