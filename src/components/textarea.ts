import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type TextareaProperties = {
  '🎨 Color': 'Error' | 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'None'
  '🚦 State': 'Default' | 'Hover' | 'Focus' | 'Disabled'
  '👁️ Placeholder': boolean
  '↳ PlaceholderSlot'?: string
  '👁️ Completed': boolean
  '↳ CompletedLabel'?: string
}

export function Textarea(component: DesignComponent<TextareaProperties>) {
  const { properties } = component

  const { color, size, variant, state, placeholder, placeholderSlot } =
    cleanPropNames(properties)

  return h(
    'UTextarea',
    {
      placeholder: placeholder ? placeholderSlot : undefined,
      color: toLowerCase(color),
      variant: toLowerCase(variant),
      size,
      disabled: state === 'Disabled',
    },
    {
      color: 'primary',
      variant: 'outline',
      size: 'md',
      disabled: false,
    },
  )
}
