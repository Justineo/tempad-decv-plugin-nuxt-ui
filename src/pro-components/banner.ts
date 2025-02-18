import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { IconProperties } from '../components/icon'
import { findChildren } from '@tempad-dev/plugins'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { ui } from '../components/config'
import { getIconName } from '../components/icon'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type BannerProperties = {
  '👁️ Action2': boolean
  '👁️ IconLeading': boolean
  '𝐓 Title': string
  '👁️ Action1': boolean
  '👁️ Close': boolean
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '🎨 Color':
    | 'Neutral'
    | 'Primary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
    | 'Secondary'
  '🖥️ Device': 'Desktop' | 'Mobile'
  '🚦 State': 'Default' | 'Hover'
}

export function Banner(component: DesignComponent<BannerProperties>) {
  const {
    iconLeading,
    iconLeadingName,
    close: showClose,
    title,
    color,
  } = cleanPropNames(component.properties)

  const buttons = findChildren<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
  })

  const actions = (showClose ? buttons.slice(0, -1) : buttons).map((button) =>
    renderButtonItem(button, { color: 'neutral', size: 'xs' }),
  )

  const { icon: closeIcon, ...close } = showClose
    ? renderButtonItem(buttons.at(-1)!, {
        size: 'md',
        color: 'neutral',
        variant: 'ghost',
      })
    : {}

  return h(
    'UBanner',
    {
      color: toLowerCase(color),
      icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
      title,
      actions: actions.length > 0 ? actions : undefined,
      close: showClose && Object.keys(close).length > 0 ? close : showClose,
      closeIcon,
    },
    {
      color: 'primary',
      close: false,
      closeIcon: ui.icons.close,
    },
  )
}
