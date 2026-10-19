import { base, unicorn, react, a11y, jsdoc, vitest, tailwind } from '@bilazo/oxc-config/lint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [
    base(),
    unicorn(),
    react(),
    a11y(),
    jsdoc(),
    vitest(),
    tailwind({ entryPoint: 'src/styles/defaults.css' }),
  ],
  overrides: [
    // ---------------------------------------------------------------------
    // Library guardrails
    // ---------------------------------------------------------------------
    {
      files: ['src/components/**/*.{ts,tsx}'],
      rules: {
        // Kito must stay framework-agnostic.
        // Enforced via Oxlint's built-in `no-restricted-imports`.
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '@tanstack/react-router',
                  '@tanstack/start',
                  'next',
                  'next/*',
                  'react-router',
                  'react-router-*',
                  '@remix-run/*',
                  'wouter',
                ],
                message:
                  'Kito must stay framework-agnostic. Do not import router or meta-framework packages.',
              },
            ],
          },
        ],
      },
    },

    // ---------------------------------------------------------------------
    // JSDoc: props interfaces carry the docs, not the component function
    // ---------------------------------------------------------------------
    {
      // React components, subcomponents, and helpers documented via their
      // props interfaces. `@param`/`@returns` on the function body duplicate
      // what the props interface already says and make component files noisy.
      files: ['src/components/**/*.{ts,tsx}', 'src/lib/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-returns': 'off',
        'jsdoc/require-param': 'off',
      },
    },

    // ---------------------------------------------------------------------
    // Vitest: allow PascalCase for component names in describe
    // ---------------------------------------------------------------------
    {
      files: ['src/components/**/*.test.tsx'],
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
        // `describe("Button")` — the component name is a proper noun.
        'vitest/prefer-lowercase-title': ['error', { ignoreTopLevelDescribe: true }],
      },
    },

    // ---------------------------------------------------------------------
    // Tailwind: our design tokens are not yet discoverable by the plugin
    // ---------------------------------------------------------------------
    {
      // The better-tailwindcss plugin can't resolve our custom @theme tokens
      // (bg-primary, text-muted-foreground, ...) so its canonical-class rule
      // produces false positives. Re-enable once it reads from defaults.css.
      files: ['**/*.{ts,tsx}'],
      rules: {
        'better-tailwindcss/enforce-canonical-classes': 'off',
      },
    },

    // ---------------------------------------------------------------------
    // Relative parent imports
    // ---------------------------------------------------------------------
    {
      files: ['src/components/**/*.{ts,tsx}'],
      rules: {
        // Internal cross-component imports and shared `lib/` access are normal
        // in a component library. The rule is designed for apps, where deep
        // imports across module boundaries usually signal a design problem.
        // Here, everything under src/ is one unit.
        'import/no-relative-parent-imports': 'off',
      },
    },
  ],
})
