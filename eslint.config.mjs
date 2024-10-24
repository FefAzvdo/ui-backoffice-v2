import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import airbnb from "eslint-config-airbnb";

// Extensões do Prettier
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  // Adiciona as configurações recomendadas dos plugins
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnb,
  pluginPrettier.configs.recommended,
  configPrettier, // Para evitar conflitos de formatação com Prettier
  {
    // Adiciona plugins
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReact,
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },
    // Adiciona regras e settings
    rules: {
      "import/no-unresolved": "error",
      "prettier/prettier": "error", // Força Prettier a ser seguido como erro
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
      react: {
        version: "detect", // Para detectar automaticamente a versão do React
      },
    },
  },
];
