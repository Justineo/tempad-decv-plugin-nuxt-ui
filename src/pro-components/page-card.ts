import type { DesignComponent } from '@tempad-dev/plugins'
import type { IconProperties } from '../components/icon'
import { getIconName } from '../components/icon'
import { cleanPropNames, h, LOREM_IPSUM_TEXT, toLowerCase } from '../utils'

export type PageCardProperties = {
  '👁️ Slot': boolean
  '↳ Slot': DesignComponent
  '𝐓 Description': string
  '𝐓 Title': string
  '↳ IconName': DesignComponent<IconProperties>
  '👁️ Icon': boolean
  '◆ Variant': 'Ghost' | 'Outline' | 'Soft' | 'Subtle' | 'Solid' | 'Naked'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '🚦 State': 'Default' | 'Hover'
  '👁️ Reverse': 'False' | 'True'
}

export function PageCard(component: DesignComponent<PageCardProperties>) {
  const { title, description, icon, iconName, variant, orientation, reverse, showSlot } = cleanPropNames(
    component.properties,
    {
      '👁️ Slot': 'showSlot',
    },
  )

  return h(
    'UPageCard',
    {
      icon: icon ? getIconName(iconName.name) : undefined,
      title,
      description,
      orientation: toLowerCase(orientation),
      reverse: reverse === 'True',
      variant: toLowerCase(variant),
    },
    {
      orientation: 'vertical',
      reverse: false,
      variant: 'outline',
    },
    showSlot ? [LOREM_IPSUM_TEXT] : [],
  )
}
