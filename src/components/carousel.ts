import type { CarouselProps } from '@nuxt/ui'
import type { DesignComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { renderButtonItem } from './button'
import { ui } from './config'

export type CarouselProperties = {
  '◆ Variant': 'Default' | 'Fade' | 'Single'
  '⇅ DotsPosition': 'Bottom' | 'Top'
  '⇅ Prev/Next Position': 'Bottom' | 'Center' | 'Top'
  '👁️ Pagination': boolean
  '👁️ Prev/Next': boolean
}

export function Carousel(component: DesignComponent<CarouselProperties>) {
  const { properties } = component

  const { variant, pagination, prevNext } = cleanPropNames(properties)

  let arrowProps: Pick<
    CarouselProps<unknown>,
    'prev' | 'prevIcon' | 'next' | 'nextIcon'
  > = {}
  if (prevNext) {
    const container = findChild<FrameNode>(component, {
      type: 'FRAME',
      name: 'Carousel + prev/next',
      visible: true,
    })!
    const [prevButton, nextButton] = findChildren<
      DesignComponent<ButtonProperties>
    >(container, { type: 'INSTANCE', visible: true })
    const defaults = {
      size: 'md',
      color: 'neutral',
      variant: 'link',
    } as const
    const { icon: prevIcon, ...prev } = renderButtonItem(prevButton, {
      ...defaults,
      icon: ui.icons.arrowLeft,
    })
    const { icon: nextIcon, ...next } = renderButtonItem(nextButton, {
      ...defaults,
      icon: ui.icons.arrowRight,
    })

    arrowProps = {
      prev,
      next,
      prevIcon,
      nextIcon,
    }
  }

  return h(
    'UCarousel',
    {
      items: [],
      arrows: prevNext,
      dots: pagination,
      fade: variant === 'Fade',
      ...arrowProps,
    },
    {
      arrows: false,
      dots: false,
      fade: false,
    },
  )
}
