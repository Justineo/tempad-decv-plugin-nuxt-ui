import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick, toLowerCase } from '../utils'
import { getIconName } from './icon'

export type StepperItemProperties = {
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '🎨 Color':
    | 'Primary'
    | 'Neutral'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '◆ Variant': 'Icon' | 'Span'
  '🚦State':
    | 'Active'
    | 'Active + focus'
    | 'Default'
    | 'Default + focus'
    | 'Disabled'
  '🙂 IconName'?: DesignComponent
  '𝐓 Span'?: string
}

export function getStepperItem(
  component: DesignComponent<StepperItemProperties>,
) {
  const { properties } = component

  const { variant, state, iconName } = cleanPropNames(properties, {
    '🚦State': 'state',
  })

  return pick(
    {
      icon: variant === 'Icon' ? getIconName(iconName?.name) : undefined,
      disabled: state === 'Disabled',
    },
    {
      disabled: false,
    },
  )
}

export type StepperProperties = {
  '🎨 Color':
    | 'Primary'
    | 'Neutral'
    | 'Secondary'
    | 'Success'
    | 'Info'
    | 'Warning'
    | 'Error'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Step': '1' | '2' | '3'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '𝐓 Title1': string
  '𝐓 Title2': string
  '𝐓 Title3': string
  '👁️ Description': boolean
  '↳ Description1'?: string
  '↳ Description2'?: string
  '↳ Description3'?: string
}

export function Stepper(component: DesignComponent<StepperProperties>) {
  const { properties } = component

  const { color, size, step, orientation } = cleanPropNames(properties)

  const stepContainers = findChildren<FrameNode>(component, {
    type: 'FRAME',
    name: /^Step/,
    visible: true,
  })

  const items = stepContainers
    .map((stepContainer) => {
      const step = findChild<DesignComponent<StepperItemProperties>>(
        stepContainer,
        {
          type: 'INSTANCE',
          name: 'Stepper_Item',
          visible: true,
        },
      )
      const titleAndDesc = findChild<FrameNode>(stepContainer, {
        type: 'FRAME',
        name: 'Title + description',
        visible: true,
      })
      const [title, description] = titleAndDesc
        ? findChildren<TextNode>(titleAndDesc, {
            type: 'TEXT',
            visible: true,
          })
        : []

      const stepItem = step
        ? {
            title: title?.characters,
            description: description?.characters,
            ...getStepperItem(step),
          }
        : undefined

      return stepItem
    })
    .filter((step) => step != null)

  return h(
    'UStepper',
    {
      // @ts-expect-error: TS2353 because modelValue is defined with `defineModel` thus not in the props
      modelValue: Number(step) - 1,
      items,
      color: toLowerCase(color),
      size,
      orientation: toLowerCase(orientation),
    },
    {
      color: 'primary',
      size: 'md',
      orientation: 'horizontal',
    },
  )
}
