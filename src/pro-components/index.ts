import type { RenderFn } from '../types'
import { COMPONENT_MAP } from '../components'

import { createTransformComponent } from '../utils'
import { Banner } from './banner'
import { BlogPost } from './blog-post'
import { BlogPosts } from './blog-posts'
import { ColorModeSelect } from './color-mode-select'
import { ColorModeSwitch } from './color-mode-switch'
import { ContentNavigation } from './content-navigation'
import { ContentSearch } from './content-search'
import { ContentSearchButton } from './content-search-button'
import { ContentSurround } from './content-surround'
import { ContentToc } from './content-toc'
import { Error } from './error'
import { Footer } from './footer'
import { FooterColumns } from './footer-columns'
import { Header } from './header'
import { LocaleSelect } from './locale-select'
import { User } from './user'

export const PRO_COMPONENT_MAP: Record<string, RenderFn> = {
  ...COMPONENT_MAP,
  Banner,
  BlogPost,
  BlogPosts,
  ColorModeSelect,
  ColorModeSwitch,
  ContentNavigation,
  ContentSearch,
  ContentSearchButton,
  ContentSurround,
  ContentToc,
  Error,
  Footer,
  FooterColumns,
  Header,
  LocalSelect: LocaleSelect,
  LocaleSelect,
  User,
}

export const transformComponent = createTransformComponent(PRO_COMPONENT_MAP)
