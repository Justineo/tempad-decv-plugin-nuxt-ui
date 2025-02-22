import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { ui } from './config'
import { getIconName } from './icon'

export type CheckboxProperties = {
  '🙂 Icon': DesignComponent<IconProperties>
  '𝐓 Label': string
  '↳ DescriptionSlot': string
  '👁️ Description': boolean
  '👁️ Required': boolean
  '🎨 Color': 'Neutral' | 'Primary' | 'Error'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🚦 State': 'Default' | 'Checked' | 'Focus' | 'Disabled'
}

export function Checkbox(component: DesignComponent<CheckboxProperties>) {
  const { color, size, state, label, description, descriptionSlot, required, icon } = cleanPropNames(
    component.properties,
  )

  return h(
    'UCheckbox',
    {
      label,
      description: description ? descriptionSlot : undefined,
      color: toLowerCase(color),
      size,
      icon: getIconName(icon.name),
      disabled: state === 'Disabled',
      required,
    },
    {
      color: 'primary',
      size: 'md',
      icon: ui.icons.check,
      disabled: false,
      required: false,
    },
  )
}
