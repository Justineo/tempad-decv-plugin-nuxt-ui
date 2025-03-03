import type { FooterColumn, FooterColumnLink } from '@nuxt/ui-pro/runtime/components/FooterColumns.vue'
import type { DesignComponent, DevComponent, FrameNode } from '@tempad-dev/plugins'
import type { ButtonProperties } from '../components/button'
import type { FormFieldProperties } from '../components/form-field'
import type { IconProperties } from '../components/icon'
import { findChildren, queryAll, queryOne } from '@tempad-dev/plugins'
import { Button, BUTTON_NAMES } from '../components/button'
import { FormField } from '../components/form-field'
import { getIconName } from '../components/icon'
import { getLinkTo } from '../components/link'
import { cleanPropNames, h, renderSlot } from '../utils'

export type FooterColumnLinkProperties = {
  '𝐓 Label': string
  '↳ IconLeadingName': DesignComponent<IconProperties>
  '🙂 IconLeading': boolean
  '👁️ External': boolean
  '🚦State': 'Default' | 'Hover' | 'Active'
}

export function renderFooterColumnLink(item: DesignComponent<FooterColumnLinkProperties>): FooterColumnLink {
  const { label, iconLeadingName, iconLeading, external } = cleanPropNames(item.properties)

  return {
    label,
    to: getLinkTo(label, external ? 'external' : 'path'),
    icon: iconLeading ? getIconName(iconLeadingName.name) : undefined,
    external,
  }
}

export type FooterColumnsProperties = {
  '𝐓 TitleSection4': string
  '𝐓 TitleSection3': string
  '𝐓 TitleSection2': string
  '𝐓 TitleSection1': string
  '👁️ Column3': boolean
  '👁️ Column4': boolean
  '👁️ Newsletter': boolean
  '🖥️ Device': 'Desktop' | 'Mobile'
}

export function FooterColumns(component: DesignComponent<FooterColumnsProperties>) {
  const props = cleanPropNames(component.properties)

  const columns: FooterColumn<FooterColumnLink>[] = findChildren<FrameNode>(component, {
    type: 'FRAME',
    name: /^Column /,
  }).map((column, index) => {
    const i = (index + 1) as 1 | 2 | 3 | 4
    const label = props[`titleSection${i}`]

    const children = queryAll<DesignComponent<FooterColumnLinkProperties>>(column, [
      { query: 'child', type: 'FRAME', name: 'Links' },
      { query: 'children', type: 'INSTANCE', name: 'FooterColumnsLink' },
    ]).map((item) => renderFooterColumnLink(item))

    return {
      label,
      children,
    }
  })

  const children: DevComponent['children'] = []

  if (props.newsletter) {
    const field = queryOne<DesignComponent<FormFieldProperties>>(component, [
      { query: 'child', type: 'FRAME', name: 'Newsletter' },
      { query: 'child', type: 'INSTANCE', name: 'FormField' },
    ])

    const button = queryOne<DesignComponent<ButtonProperties>>(component, [
      { query: 'child', type: 'FRAME', name: 'Newsletter' },
      { query: 'child', type: 'INSTANCE', name: BUTTON_NAMES },
    ])

    if (field) {
      const formField = FormField(field)

      if (button) {
        const buttonComponent = Button(button)
        const inputComponent = formField.children.find(
          (child) => typeof child !== 'string' && child.name === 'UInput',
        ) as DevComponent | undefined

        if (inputComponent) {
          inputComponent.children.push(renderSlot('trailing', [buttonComponent]))
        }
      }

      children.push(renderSlot('right', [formField]))
    }
  }

  return h(
    'UFooterColumns',
    {
      columns,
    },
    {},
    children,
  )
}
