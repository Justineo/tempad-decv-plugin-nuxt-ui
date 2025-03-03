import type { DesignComponent } from '@tempad-dev/plugins'
import type { AvatarItem } from '../components/avatar'
import type { IconProperties } from '../components/icon'
import { queryAll } from '@tempad-dev/plugins'
import { getRandomAvatar } from '../components/avatar'
import { getIconName } from '../components/icon'
import { cleanPropNames, h } from '../utils'

export type PageLogosProperties = {
  '↳ Title': string
  '❖ Slot8': DesignComponent
  '❖ Slot7': DesignComponent
  '❖ Slot6': DesignComponent
  '❖ Slot5': DesignComponent
  '👁️ Title': boolean
  '❖ Slot4': DesignComponent
  '❖ Slot3': DesignComponent
  '❖ Slot2': DesignComponent
  '❖ Slot1': DesignComponent
  '◆ Variant': 'Icons' | 'Logos'
  '👁️ Overlay': 'False' | 'True'
}

export function PageLogos(component: DesignComponent<PageLogosProperties>) {
  const { title, showTitle, variant, overlay } = cleanPropNames(component.properties, {
    '👁️ Title': 'showTitle',
  })

  const items: (string | Required<AvatarItem>)[] = []
  if (variant === 'Icons') {
    const icons = queryAll<DesignComponent<IconProperties>>(component, [
      { query: 'child', type: 'FRAME', name: 'Icons' },
      { query: 'children', type: 'INSTANCE' },
    ])
      .map((icon) => getIconName(icon.name))
      .filter((name) => name != null)
    items.push(...icons)
  } else {
    const logos = queryAll<DesignComponent<IconProperties>>(component, [
      { query: 'child', type: 'FRAME', name: 'Logos' },
      { query: 'children', type: 'INSTANCE' },
    ]).map(() => getRandomAvatar())
    items.push(...logos)
  }

  return h(
    'UPageLogos',
    {
      title: (showTitle && title) || undefined,
      items,
      marquee: overlay === 'True',
    },
    {
      marquee: false,
    },
  )
}
