import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { getIconName } from './icon'

export type SwitchProperties = {
  '🎨 Color':
    | 'Error'
    | 'Neutral'
    | 'Primary'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Active' | 'Default' | 'Disabled' | 'Focus'
  '𝐓 Title': string
  '↳ Description': boolean
  '𝐓 Description'?: string
  '👁️ DefaultIcon': boolean
  '↳ DefaultIconName'?: DesignComponent<IconProperties>
  '👁️ ActiveIcon': boolean
  '↳ ActiveIconName'?: DesignComponent<IconProperties>
  '👁️ Required': boolean
}

export function Switch(component: DesignComponent<SwitchProperties>) {
  const { properties } = component

  const {
    color,
    size,
    state,
    title,
    showDescription,
    description,
    defaultIcon,
    defaultIconName,
    activeIcon,
    activeIconName,
    required,
  } = cleanPropNames(properties, {
    '↳ Description': 'showDescription',
  })

  return h(
    'USwitch',
    {
      label: title,
      description: (showDescription && description) || undefined,
      color: toLowerCase(color),
      size,
      checkedIcon: defaultIcon ? getIconName(activeIconName?.name) : undefined,
      uncheckedIcon: activeIcon
        ? getIconName(defaultIconName?.name)
        : undefined,
      disabled: state === 'Disabled',
      required,
    },
    {
      color: 'primary',
      size: 'md',
      disabled: false,
      required: false,
    },
  )
}
