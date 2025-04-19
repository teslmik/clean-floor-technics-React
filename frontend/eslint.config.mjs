import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  }
]
