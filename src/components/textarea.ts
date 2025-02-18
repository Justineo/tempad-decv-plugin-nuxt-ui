import type { DesignComponent } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'

export type TextareaProperties = {
  '↳ PlaceholderSlot': string
  '👁️ Placeholder': boolean
  '↳ CompletedLabel': string
  '👁️ Completed': boolean
  '🎨 Color': 'Error' | 'Neutral' | 'Primary'
  '📏 Size': 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  '◆ Variant': 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'None'
  '🚦 State': 'Default' | 'Hover' | 'Focus' | 'Disabled'
}

export function Textarea(component: DesignComponent<TextareaProperties>) {
  const { color, size, variant, state, placeholder, placeholderSlot } =
    cleanPropNames(component.properties)

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
