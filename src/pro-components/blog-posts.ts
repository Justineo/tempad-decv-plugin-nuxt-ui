import type { DesignComponent } from '@tempad-dev/plugins'
import type { BlogPostProperties } from './blog-post'
import { findAll } from '@tempad-dev/plugins'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { renderBlogPostItem } from './blog-post'

export type BlogPostsProperties = {
  Orientation: 'Horizontal' | 'Vertical'
}

export function BlogPosts(component: DesignComponent<BlogPostsProperties>) {
  const { orientation } = cleanPropNames(component.properties)

  const posts = findAll<DesignComponent<BlogPostProperties>>(component, {
    type: 'INSTANCE',
    name: 'BlogPost',
  }).map(renderBlogPostItem)

  return h(
    'UBlogPosts',
    {
      orientation: toLowerCase(orientation),
      posts,
    },
    {
      orientation: 'horizontal',
    },
  )
}
