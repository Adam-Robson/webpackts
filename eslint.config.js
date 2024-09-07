import globals from 'globals';
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json',
        projectService: true,
        tsconfigRootDir: '.'
      },
    },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-multi-spaces': ['error', { ignoreEOLComments: true }],
      'new-cap': ['error', { capIsNew: false }],
      'no-redeclare': ['error', { builtinGlobals: true }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      'array-bracket-spacing': 'error'
    }
  },
  {
    ignores: [
      "node_modules/**/*",
      "dist/**/*",
      "*.config.js",
      "*.config.cjs",
      "!src/**/*.tsx"
    ]
  }
);
