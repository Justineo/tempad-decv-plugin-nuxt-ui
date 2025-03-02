import type { DesignComponent } from '@tempad-dev/plugins'
import { omit } from '@s-libs/micro-dash'
import { Accordion } from '../components/accordion'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type PageAccordionProperties = {}

export function PageAccordion(component: DesignComponent<PageAccordionProperties>) {
  const accordion = Accordion(component)

  return h('UPageAccordion', omit(accordion.props, 'ui'), {})
}
