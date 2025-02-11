import { definePlugin } from '@tempad-dev/plugins'
import { transformComponent } from './components'

export const plugin = definePlugin({
  name: 'Nuxt UI',
  code: {
    component: {
      title: 'Component',
      lang: 'vue',
      transformComponent,
    },
  },
})
