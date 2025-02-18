import type { CarouselProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { queryAll } from '@tempad-dev/plugins'
import { cleanPropNames, h } from '../utils'
import { BUTTON_NAMES, renderButtonItem } from './button'
import { ui } from './config'

export type CarouselProperties = {
  '👁️ Prev/Next': boolean
  '👁️ Pagination': boolean
  '◆ Variant': 'Default' | 'Fade' | 'Single'
  '⇅ DotsPosition': 'Bottom' | 'Top'
  '⇅ Prev/Next Position': 'Bottom' | 'Center' | 'Top'
}

export function Carousel(component: DesignComponent<CarouselProperties>) {
  const { variant, pagination, prevNext } = cleanPropNames(component.properties)

  let arrowProps: Pick<
    CarouselProps<unknown>,
    'prev' | 'prevIcon' | 'next' | 'nextIcon'
  > = {}
  if (prevNext) {
    const [prevButton, nextButton] = queryAll<
      DesignComponent<ButtonProperties>
    >(component, [
      { query: 'child', type: 'FRAME', name: 'Carousel + prev/next' },
      { query: 'children', type: 'INSTANCE', name: BUTTON_NAMES },
    ])
    const defaults = {
      size: 'md',
      color: 'neutral',
      variant: 'link',
    } as const
    const { icon: prevIcon, ...prev } = prevButton
      ? renderButtonItem(prevButton, {
          ...defaults,
          icon: ui.icons.arrowLeft,
        })
      : {}
    const { icon: nextIcon, ...next } = nextButton
      ? renderButtonItem(nextButton, {
          ...defaults,
          icon: ui.icons.arrowRight,
        })
      : {}

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
