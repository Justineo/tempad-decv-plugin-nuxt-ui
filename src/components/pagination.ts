import type { ButtonProps } from '@nuxt/ui'
import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from './button'
import { findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, isInteger } from '../utils'
import { BUTTON_NAMES, renderButtonItem } from './button'
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
  const { size } = cleanPropNames(component.properties)

  const items = findChildren<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
  }).map((button) => renderButtonItem(button))

  let controls: Partial<ButtonProps>[] = []
  if (items.length >= 5) {
    controls = [...items]
    controls.splice(2, items.length - 4)
    controls = controls.every((control) => !isInteger(control.label || ''))
      ? controls
      : []
  }

  const showControls = controls.length === 4
  const [first, prev, next, last] = controls

  const pages = showControls ? items.splice(2, items.length - 4) : items

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
      firstIcon: first?.icon,
      prevIcon: prev?.icon,
      nextIcon: next?.icon,
      lastIcon: last?.icon,
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
