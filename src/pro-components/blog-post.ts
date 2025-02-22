import type { DesignComponent } from '@tempad-dev/plugins'
import type { BadgeProperties } from '../components/badge'
import { queryOne } from '@tempad-dev/plugins'
import { renderBadgeItem } from '../components/badge'
import { cleanPropNames, h, toLowerCase } from '../utils'

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

  const badge = showBadge && badgeNode ? renderBadgeItem(badgeNode) : undefined

  return h(
    'UBlogPost',
    {
      title,
      description: showDescription ? description : undefined,
      date: showDate ? date : undefined,
      badge,
      authors: authors && author === 'Multiple' ? [] : undefined, // TODO: Implement User
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
