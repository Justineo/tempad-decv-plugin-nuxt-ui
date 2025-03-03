import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import type { BadgeProperties } from '../components/badge'
import type { ButtonProperties } from '../components/button'
import type { IconProperties } from '../components/icon'
import type { PricingPlanProps } from '../types'
import { findChild, queryAll, queryOne } from '@tempad-dev/plugins'
import { renderBadgeItem } from '../components/badge'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { ui } from '../components/config'
import { getIconName } from '../components/icon'
import { cleanPropNames, h, pickOverrides, toLowerCase } from '../utils'

export type PricingPlanFeature = {
  title: string
  icon?: string
}

export type PricingPlanProperties = {
  '👁️ Terms': boolean
  '↳ Tagline': string
  '👁️ Tagline': boolean
  '👁️ BillingCycle': boolean
  '👁️ Features': boolean
  '↳ Terms': string
  '𝐓 Price': string
  '𝐓 Description': string
  '👁️ Discount': boolean
  '👁️ BillingPeriod': boolean
  '↳ Discount': string
  '👁️ Badge': boolean
  '𝐓 Title': string
  '◆ Variant': 'Outline' | 'Solid' | 'Soft' | 'Subtle'
  '⇅ Orientation': 'Horizontal' | 'Vertical' | 'Horizontal (Mobile'
  '👁️ Highlight': 'False' | 'True'
}

export function PricingPlan(component: DesignComponent<PricingPlanProperties>) {
  const {
    terms,
    showTerms,
    tagline,
    showTagline,
    billingCycle: showBillingCycle,
    features: showFeatures,
    price,
    discount,
    showDiscount,
    billingPeriod: showBillingPeriod,
    badge: showBadge,
    title,
    variant,
    orientation,
    highlight,
  } = cleanPropNames(component.properties, {
    '👁️ Terms': 'showTerms',
    '👁️ Tagline': 'showTagline',
    '👁️ Discount': 'showDiscount',
  })

  const descriptionNode = queryOne<TextNode>(component, [
    {
      query: 'one',
      type: 'FRAME',
      name: 'Title + description',
    },
    { query: 'child', type: 'TEXT' },
  ])
  const description = descriptionNode?.characters || undefined

  const badgeNode = showBadge
    ? queryOne<DesignComponent<BadgeProperties>>(component, [
        { query: 'one', type: 'FRAME', name: 'Title + badge' },
        { query: 'one', type: 'INSTANCE', name: 'Badge' },
      ])
    : undefined
  const badge = badgeNode
    ? renderBadgeItem(badgeNode, {
        color: 'primary',
        variant: 'subtle',
      })
    : undefined

  const billings = queryAll<TextNode>(component, [
    { query: 'one', type: 'FRAME', name: 'BillingInfos' },
    { query: 'children', type: 'TEXT' },
  ]).map((textNode) => textNode.characters)
  const billingPeriod = showBillingPeriod ? billings.shift() : undefined
  const billingCycle = showBillingCycle ? billings.shift() : undefined

  let features: string[] | PricingPlanFeature[] = queryAll<FrameNode>(component, [
    { query: 'child', type: 'FRAME', name: 'Features' },
    { query: 'children', type: 'FRAME', name: /^Feature / },
  ]).map((feature) => {
    const title = findChild<TextNode>(feature, { type: 'TEXT' })?.characters
    const iconNode = findChild<DesignComponent<IconProperties>>(feature, { type: 'INSTANCE' })
    const icon = iconNode ? getIconName(iconNode.name) : undefined

    return pickOverrides({ title: title || '', icon }, { icon: ui.icons.success }) as PricingPlanFeature
  })
  if (features.every((feature) => !feature.icon)) {
    features = features.map((feature) => feature.title)
  }

  const buttonNode = queryOne<DesignComponent<ButtonProperties>>(component, [
    { query: 'child', type: 'FRAME', name: 'Footer' },
    { query: 'child', type: 'INSTANCE', name: BUTTON_NAMES },
  ])
  const button = buttonNode ? renderButtonItem(buttonNode, { size: 'lg', block: true }) : undefined

  return h(
    'UPricingPlan',
    {
      title,
      description,
      badge,
      billingCycle,
      billingPeriod,
      price,
      discount: (showDiscount && discount) || undefined,
      features: showFeatures ? features : undefined,
      button,
      tagline: (showTagline && tagline) || undefined,
      terms: (showTerms && terms) || undefined,
      orientation: toLowerCase(orientation),
      variant: toLowerCase(variant),
      highlight: highlight === 'True',
    },
    {
      orientation: 'vertical',
      variant: 'outline',
      highlight: false,
    },
  )
}

export function renderPricingPlanItem(plan: DesignComponent<PricingPlanProperties>): PricingPlanProps {
  return PricingPlan(plan).props
}
