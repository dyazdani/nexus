import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        extends: [
            'airbnb',
            'airbnb-typescript',
            'airbnb/hooks',
            'plugin:prettier/recommended',
        ],
    },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: './tsconfig.json',
        },
    },
];
