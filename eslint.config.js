import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';

import typescriptParser from '@typescript-eslint/parser';

export default [
  { files: ['**/*.{js,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/naming-convention': 'error',
    },
  },
];
