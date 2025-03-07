import type { RenderFn } from '../types'
import { COMPONENT_MAP } from '../components'

import { createTransformComponent } from '../utils'
import { Banner } from './banner'
import { BlogPost } from './blog-post'
import { BlogPosts } from './blog-posts'
import { ColorModeSelect } from './color-mode-select'
import { ColorModeSwitch } from './color-mode-switch'
import { ContentNavigation } from './content-navigation'
import { ContentSearch } from './content-search'
import { ContentSearchButton } from './content-search-button'
import { ContentSurround } from './content-surround'
import { ContentToc } from './content-toc'
import { Error } from './error'
import { Footer } from './footer'
import { FooterColumns } from './footer-columns'
import { Header } from './header'
import { LocaleSelect } from './locale-select'
import { PageAccordion } from './page-accordion'
import { PageAnchors } from './page-anchors'
import { PageAside } from './page-aside'
import { PageCard } from './page-card'
import { PageColumns } from './page-columns'
import { PageCTA } from './page-cta'
import { PageFeature } from './page-feature'
import { PageGrid } from './page-grid'
import { PageHeader } from './page-header'
import { PageHero } from './page-hero'
import { PageLinks } from './page-links'
import { PageLogos } from './page-logos'
import { PageSection } from './page-section'
import { PricingPlan } from './pricing-plan'
import { PricingPlans } from './pricing-plans'
import { User } from './user'

export const PRO_COMPONENT_MAP: Record<string, RenderFn> = {
  ...COMPONENT_MAP,
  Banner,
  BlogPost,
  BlogPosts,
  ColorModeSelect,
  ColorModeSwitch,
  ContentNavigation,
  ContentSearch,
  ContentSearchButton,
  ContentSurround,
  ContentToc,
  Error,
  Footer,
  FooterColumns,
  Header,
  LocalSelect: LocaleSelect,
  LocaleSelect,
  PageAccordion,
  PageAnchors,
  PageAside,
  PageCard,
  PageColumns,
  PageCTA,
  PageFeature,
  PageGrid,
  PageHeader,
  PageHero,
  PageLinks,
  PageLogos,
  PageSection,
  PricingPlan,
  PricingPlans,
  User,
}

export const transformComponent = createTransformComponent(PRO_COMPONENT_MAP)
