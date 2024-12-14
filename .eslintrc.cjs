/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@tanstack/query/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@tanstack/query", "eslint-plugin-react-compiler"],
  rules: {
    "react-compiler/react-compiler": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",
    "func-style": ["warn", "expression"],
    "@tanstack/query/exhaustive-deps": "warn",
    "@tanstack/query/prefer-query-object-syntax": "off",
    "@tanstack/query/stable-query-client": "warn",
  },
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts", "tailwind.config.js"],
};
