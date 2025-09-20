/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    // Aponta para o novo tsconfig.json na raiz do monorepo
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Adicione ou personalize suas regras aqui
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
