import antfu from '@antfu/eslint-config'
import deMorgan from 'eslint-plugin-de-morgan'

export default antfu(
  {
    type: 'lib',
    rules: {
      'ts/consistent-type-definitions': 'off',
      'ts/explicit-function-return-type': 'off',
    },
    markdown: false,
  },
  deMorgan.configs.recommended,
)
