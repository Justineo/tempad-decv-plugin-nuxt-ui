import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import { queryAll } from '@tempad-dev/plugins'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h } from '../utils'

export type PageHeaderProperties = {
  '👁️ Links': boolean
  '𝐓 Description': string
  '𝐓 Title': string
  '↳ Headline': string
  '👁️ Headline': boolean
  '🖥️ Device': 'Desktop' | 'Mobile'
}

export function PageHeader(component: DesignComponent<PageHeaderProperties>) {
  const {
    title,
    description,
    headline,
    showHeadline,
    links: showLinks,
  } = cleanPropNames(component.properties, {
    '👁️ Headline': 'showHeadline',
  })

  const links = queryAll<DesignComponent<ButtonProperties>>(component, [
    { query: 'all', type: 'FRAME', name: 'Links' },
    { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
  ])
    .map((button) =>
      renderButtonItem(button, {
        color: 'neutral',
        variant: 'outline',
      }),
    )
    .map((link) => ({
      ...link,
      to: getLinkTo(link.label || ''),
    }))

  return h(
    'UPageHeader',
    {
      headline: (showHeadline && headline) || undefined,
      title,
      description,
      links: showLinks ? links : undefined,
    },
    {},
  )
}
