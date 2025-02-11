import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/nuxt-ui'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
})
