import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: ['dist/**', '*.min.js', 'node_modules/**', '**/*.d.ts'],
  embeddedLanguageFormatting: 'auto',
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: false,
  bracketSpacing: true,
  objectCurlySpacing: true,
  sortImports: {
    newlinesBetween: false,
    groups: [
      ['value-builtin', 'value-external'],
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      { newlinesBetween: true },
      'type-import',
      'unknown',
    ],
  },
  sortTailwindcss: {
    stylesheet: './src/index.css',
    functions: ['clsx', 'cn'],
    preserveWhitespace: true,
  },
  jsdoc: {
    bracketSpacing: true,
  },
});
