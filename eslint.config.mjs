// Flat ESLint config for ESLint v9+
// Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new

import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  // Ignored paths
  {
    ignores: [
      '.next/**',
      '**/.next/**',
      'node_modules/**',
      'public/**',
      'dist/**',
      'out/**',
      '.vercel/**',
      'convex/_generated/**',
      '**/convex/_generated/**'
    ],
    // Warn when eslint-disable comments are unused
    linterOptions: { reportUnusedDisableDirectives: true }
  },
  // Base JS rules
  js.configs.recommended,
  // TypeScript recommended (no type-checking to keep it fast and dependency-light)
  ...tseslint.configs.recommended,
  // Next.js core web vitals (map rules into flat config to avoid legacy extends)
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: nextPlugin.configs['core-web-vitals'].rules
  },
  // Tailwind and project-specific tweaks
  {
    plugins: {
      tailwindcss: tailwind,
      // Warn and autofix unused imports/vars
      'unused-imports': unusedImports,
      'react-hooks': reactHooks
    },
    rules: {
      // Prefer plugin over TS rule to catch unused imports too
      '@typescript-eslint/no-unused-vars': 'off',
      // Keep explicit-any as warn (not error) so focus stays on unused cleanup unless strict is desired
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        { 'ts-expect-error': 'allow-with-description' }
      ],
      '@typescript-eslint/no-require-imports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'no-console': 'off',
      // Keep style rules as warnings to avoid failing CI on style only
      'prefer-const': 'warn',
      'no-empty': 'warn',
      // Disable if plugin isn't configured; avoids missing-rule error
      'react-hooks/exhaustive-deps': 'off'
    }
  }
);
