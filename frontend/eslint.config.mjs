import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  eslintPluginPrettier,
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: { globals: globals.jasmine }
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended']
  }
]);
