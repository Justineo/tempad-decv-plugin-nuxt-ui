import type { DesignComponent } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import { findChild } from '@tempad-dev/plugins'
import { BUTTON_NAMES, renderButtonItem } from '../components/button'
import { cleanPropNames, h } from '../utils'

export type ErrorProperties = {
  '𝐓 ErrorMessage': string
  '𝐓 StatusMessage': string
  '𝐓 StatusCode': string
}

export function Error(component: DesignComponent<ErrorProperties>) {
  const { errorMessage: message, statusMessage, statusCode } = cleanPropNames(component.properties)

  const button = findChild<DesignComponent<ButtonProperties>>(component, {
    type: 'INSTANCE',
    name: BUTTON_NAMES,
  })

  const clear = button
    ? renderButtonItem(button, {
        size: 'lg',
        color: 'primary',
        variant: 'solid',
        label: 'Back to home',
      })
    : false

  return h(
    'UError',
    {
      error: {
        statusCode,
        statusMessage,
        message,
      },
      clear: clear ? (Object.keys(clear).length > 0 ? clear : true) : false,
    },
    {
      clear: true,
    },
  )
}
