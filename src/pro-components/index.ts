import type { RenderFn } from '../types'
import { COMPONENT_MAP } from '../components'

import { createTransformComponent } from '../utils'

export const PRO_COMPONENT_MAP: Record<string, RenderFn> = {
  ...COMPONENT_MAP,
}

export const transformComponent = createTransformComponent(PRO_COMPONENT_MAP)
