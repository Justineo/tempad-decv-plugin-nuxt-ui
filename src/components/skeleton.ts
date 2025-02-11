import type { DesignComponent } from '@tempad-dev/plugins'
import { h } from '../utils'

export type SkeletonProperties = {
  '◆ LoadingState': '100%' | '50%'
}

export function Skeleton(_: DesignComponent<SkeletonProperties>) {
  return h('USkeleton', {}, {})
}
