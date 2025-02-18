import { defineBuildConfig } from 'unbuild'

const entries = ['src/nuxt-ui', 'src/nuxt-ui-pro']

export default defineBuildConfig(
  entries.map((entry) => ({
    entries: [entry],
    clean: true,
    rollup: {
      inlineDependencies: true,
      esbuild: {
        minify: true,
      },
    },
  })),
)
