import type { DesignComponent, FrameNode, TextNode } from '@tempad-dev/plugins'
import type { IconProperties } from './icon'
import { findChild, findChildren } from '@tempad-dev/plugins'
import { cleanPropNames, h, pick, toLowerCase } from '../utils'
import { getIconName } from './icon'

export type StepperItemProperties = {
  '𝐓 Span': string
  '🙂 IconName': DesignComponent<IconProperties>
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
      icon: variant === 'Icon' ? getIconName(iconName.name) : undefined,
      disabled: state === 'Disabled',
    },
    {
      disabled: false,
    },
  )
}

export type StepperProperties = {
  '↳ Description3': string
  '↳ Description2': string
  '𝐓 Title3': string
  '👁️ Description': boolean
  '↳ Description1': string
  '𝐓 Title2': string
  '𝐓 Title1': string
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
}

export function Stepper(component: DesignComponent<StepperProperties>) {
  const { color, size, step, orientation } = cleanPropNames(
    component.properties,
  )

  const stepContainers = findChildren<FrameNode>(component, {
    type: 'FRAME',
    name: /^Step/,
  })

  const items = stepContainers
    .map((stepContainer) => {
      const step = findChild<DesignComponent<StepperItemProperties>>(
        stepContainer,
        {
          type: 'INSTANCE',
          name: 'Stepper_Item',
        },
      )
      const titleAndDesc = findChild<FrameNode>(stepContainer, {
        type: 'FRAME',
        name: 'Title + description',
      })
      const [title, description] = titleAndDesc
        ? findChildren<TextNode>(titleAndDesc, {
            type: 'TEXT',
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
