import type { ButtonProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { cleanPropNames, h } from '../utils'
import { renderButtonItem } from './button'
import { ui } from './config'

export type PaginationProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

function parseKey(
  key?: string,
): [ButtonProps['color'], ButtonProps['variant']] {
  if (!key) {
    return [undefined, undefined]
  }
  const [colorStr, variantStr] = key.split('-')
  return [
    colorStr === 'undefined' ? undefined : (colorStr as ButtonProps['color']),
    variantStr === 'undefined'
      ? undefined
      : (variantStr as ButtonProps['variant']),
  ]
}

export function Pagination(component: DesignComponent<PaginationProperties>) {
  const { properties } = component

  const { size } = cleanPropNames(properties)

  const buttons = component.children as DesignComponent<ButtonProperties>[]
  const items = buttons.map((button) => renderButtonItem(button))
  // Remove middle buttons so that buttons now only contains the control buttons
  buttons.splice(2, buttons.length - 4)
  const showControls = buttons.some((control) => control.visible)

  const pages = items.splice(2, items.length - 4)

  const [first, prev, next, last] = items

  const ellipsis = pages.find(
    ({ icon, label }) => icon && !/^\d+$/.test(label || ''),
  )
  const pageGroups = pages.reduce(
    (acc, page) => {
      const key = `${page.color}-${page.variant}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const styles = Object.entries(pageGroups).sort(([, a], [, b]) => b - a)
  const [regularKey, activeKey] = styles.map(([key]) => key)

  const [color, variant] = parseKey(regularKey)
  const [activeColor, activeVariant] = parseKey(activeKey)

  return h(
    'UPagination',
    {
      color,
      variant,
      activeColor,
      activeVariant,
      size,
      showControls,
      disabled: pages.every((page) => page.disabled),
      firstIcon: first.icon,
      prevIcon: prev.icon,
      nextIcon: next.icon,
      lastIcon: last.icon,
      ellipsisIcon: ellipsis?.icon,
    },
    {
      color: 'neutral',
      variant: 'outline',
      activeColor: 'primary',
      activeVariant: 'solid',
      size: 'md',
      showControls: true,
      disabled: false,
      firstIcon: ui.icons.chevronDoubleLeft,
      prevIcon: ui.icons.chevronLeft,
      nextIcon: ui.icons.chevronRight,
      lastIcon: ui.icons.chevronDoubleRight,
      ellipsisIcon: ui.icons.ellipsis,
    },
  )
}
