import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import { queryAll } from '@tempad-dev/plugins'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h, LOREM_IPSUM_TEXT, toLowerCase } from '../utils'

export type PageCTAProperties = {
  '↳ Slot': DesignComponent
  '👁️ Slot': boolean
  '👁️ Links': boolean
  '↳ Description': string
  '👁️ Description': boolean
  '𝐓 Title': string
  '🖥️ Device': 'Desktop' | 'Mobile'
  '◆ Variant': 'Outline' | 'Naked' | 'Soft' | 'Solid' | 'Subtle'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '👁️ Reverse': 'False' | 'True'
}

export function PageCTA(component: DesignComponent<PageCTAProperties>) {
  const {
    title,
    description,
    orientation,
    reverse,
    variant,
    links: showLinks,
    showDescription,
    showSlot,
  } = cleanPropNames(component.properties, {
    '👁️ Slot': 'showSlot',
    '👁️ Description': 'showDescription',
  })

  const links = showLinks
    ? queryAll<DesignComponent<ButtonProperties>>(component, [
        { query: 'one', type: 'FRAME', name: 'Links' },
        { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
      ])
        .map((button) => renderButtonItem(button, { size: 'lg' }))
        .map((link) => ({
          ...link,
          to: getLinkTo(link.label || ''),
        }))
    : []

  return h(
    'UPageCTA',
    {
      title,
      description: showDescription ? description : undefined,
      orientation: toLowerCase(orientation),
      reverse: reverse === 'True',
      variant: toLowerCase(variant),
      links,
    },
    {
      orientation: 'vertical',
      reverse: false,
      variant: 'outline',
    },
    showSlot ? [LOREM_IPSUM_TEXT] : [],
  )
}
