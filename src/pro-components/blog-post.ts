import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'
import type { AvatarGroupProperties } from '../components/avatar-group'
import type { BadgeProperties } from '../components/badge'
import type { AvatarProps, BlogPostProps, UserProps } from '../types'
import type { UserProperties } from './user'
import { queryOne } from '@tempad-dev/plugins'
import { AvatarGroup } from '../components/avatar-group'
import { renderBadgeItem } from '../components/badge'
import { cleanPropNames, h, toLowerCase } from '../utils'
import { renderUserItem } from './user'

export type BlogPostProperties = {
  '👁️ Image': boolean
  '👁️ Authors': boolean
  '↳ Date': string
  '↳ Description': string
  '👁️ Description': boolean
  '👁️ Date': boolean
  '👁️ Badge': boolean
  '𝐓 Title': string
  '◆ Variant': 'Outline' | 'Soft' | 'Subtle' | 'Ghost' | 'Naked'
  '🚦State': 'Default' | 'Hover'
  '⇅ Orientation': 'Horizontal' | 'Vertical'
  '👥 Author': 'One' | 'Multiple'
}

export function BlogPost(component: DesignComponent<BlogPostProperties>) {
  const {
    image,
    authors,
    title,
    showDescription,
    description,
    showDate,
    date,
    showBadge,
    variant,
    orientation,
    author,
  } = cleanPropNames(component.properties, {
    '👁️ Description': 'showDescription',
    '👁️ Date': 'showDate',
    '👁️ Badge': 'showBadge',
  })

  const badgeNode = queryOne<DesignComponent<BadgeProperties>>(component, [
    { query: 'one', type: 'FRAME', name: 'Date + badge' },
    { query: 'one', type: 'INSTANCE', name: 'Badge' },
  ])

  const badge = showBadge && badgeNode ? renderBadgeItem(badgeNode, { color: 'neutral', variant: 'subtle' }) : undefined

  const authorItems: Partial<UserProps>[] = []

  if (authors) {
    if (author === 'One') {
      const authorNode = queryOne<DesignComponent<UserProperties>>(component, [
        { query: 'child', type: 'FRAME', name: 'Content' },
        { query: 'child', type: 'INSTANCE', name: 'User' },
      ])

      if (authorNode) {
        authorItems.push(renderUserItem(authorNode))
      }
    } else if (author === 'Multiple') {
      const authorsNode = queryOne<DesignComponent<AvatarGroupProperties>>(component, [
        { query: 'child', type: 'FRAME', name: 'Content' },
        { query: 'child', type: 'INSTANCE', name: 'AvatarGroup' },
      ])

      if (authorsNode) {
        const avatarGroup = AvatarGroup(authorsNode)
        if (avatarGroup) {
          authorItems.push(
            ...avatarGroup.children.map((child) => {
              const { props } = child as DevComponent<AvatarProps>
              return {
                avatar: props,
              }
            }),
          )
        }
      }
    }
  }

  return h(
    'UBlogPost',
    {
      title,
      description: showDescription ? description : undefined,
      date: showDate ? date : undefined,
      badge: typeof badge === 'number' ? String(badge) : badge,
      authors: authorItems,
      image: image ? 'https://picsum.photos/540/360' : undefined,
      orientation: toLowerCase(orientation),
      variant: toLowerCase(variant),
    },
    {
      orientation: 'vertical',
      variant: 'outline',
    },
  )
}

export function renderBlogPostItem(post: DesignComponent<BlogPostProperties>): Partial<BlogPostProps> {
  const {
    props: { orientation, ...rest },
  } = BlogPost(post)

  return rest
}
