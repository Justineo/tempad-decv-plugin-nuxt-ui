import type { DesignComponent } from '@tempad-dev/plugins'
import type { SelectMenuProperties } from '../components/select-menu'
import { pick } from '@s-libs/micro-dash'
import { findChild } from '@tempad-dev/plugins'
import { SelectMenu } from '../components/select-menu'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type LocaleSelectProperties = {}

export function LocaleSelect(component: DesignComponent<LocaleSelectProperties>) {
  const menu = findChild<DesignComponent<SelectMenuProperties>>(component, {
    type: 'INSTANCE',
    name: 'SelectMenu',
  })

  const { props = {} } = menu ? SelectMenu(menu) : {}

  return h(
    'ULocaleSelect',
    // https://github.com/nuxt/ui-pro/blob/f9e87ea77d9c4ffdbfcb9f627f541a63cd8ffa09/src/runtime/components/locale/LocaleSelect.vue#L4-L6
    {
      locales: [],
      ...pick(
        props,
        'color',
        'variant',
        'size',
        'trailingIcon',
        'selectedIcon',
        'content',
        'arrow',
        'portal',
        'disabled',
        'ui',
      ),
    },
    {},
  )
}
