import { definePlugin } from '@tempad-dev/plugins'
import { transformComponent } from './pro-components'

export const plugin = definePlugin({
  name: 'Nuxt UI Pro',
  code: {
    component: {
      title: 'Component',
      lang: 'vue',
      transformComponent,
    },
  },
})
