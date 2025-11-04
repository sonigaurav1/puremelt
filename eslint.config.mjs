// Flat ESLint config for ESLint v9+
// Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new

import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  // Ignored paths
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**']
  },
  // Base JS rules
  js.configs.recommended,
  // TypeScript recommended (no type-checking to keep it fast and dependency-light)
  ...tseslint.configs.recommended,
  // Next.js core web vitals
  nextPlugin.configs['core-web-vitals'],
  // Tailwind and project-specific tweaks
  {
    plugins: {
      tailwindcss: tailwind
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      'no-console': 'warn'
    }
  }
);
