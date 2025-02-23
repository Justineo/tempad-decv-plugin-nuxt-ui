import type { RenderFn } from '../types'
import { COMPONENT_MAP } from '../components'

import { createTransformComponent } from '../utils'
import { Banner } from './banner'
import { BlogPost } from './blog-post'
import { BlogPosts } from './blog-posts'
import { ColorModeSelect } from './color-mode-select'
import { User } from './user'

export const PRO_COMPONENT_MAP: Record<string, RenderFn> = {
  ...COMPONENT_MAP,
  Banner,
  BlogPost,
  BlogPosts,
  ColorModeSelect,
  User,
}

export const transformComponent = createTransformComponent(PRO_COMPONENT_MAP)
