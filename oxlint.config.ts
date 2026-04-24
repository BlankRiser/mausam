import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["dist/**", "node_modules/**"],
  plugins: ["eslint", "unicorn", "react", "oxc", "react-perf", "promise", "jsx-a11y"],
  categories: {
    correctness: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "error",
  },
});
