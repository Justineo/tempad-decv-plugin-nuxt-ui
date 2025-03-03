import type { DesignComponent } from '@tempad-dev/plugins'
import type { PricingPlanProperties } from './pricing-plan'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { renderPricingPlanItem } from './pricing-plan'

export type PricingPlansProperties = {
  '⇅ Orientation': 'Vertical' | 'Horizontal'
  '👁️ Compact': 'false' | 'true'
}

export function PricingPlans(component: DesignComponent<PricingPlansProperties>) {
  const { orientation, compact } = cleanPropNames(component.properties)

  const plans = findAll<DesignComponent<PricingPlanProperties>>(component, {
    type: 'INSTANCE',
    name: 'PricingPlan',
  }).map((plan) => renderPricingPlanItem(plan))

  return h(
    'UPricingPlans',
    {
      plans,
      orientation: toLowerCase(orientation),
      compact: compact === 'true',
    },
    {
      orientation: 'horizontal',
      compact: false,
    },
  )
}
