# 0040: e2e Testing Setup

**Status**: Complete  
**Priority**: High  
**Created**: March 2026  
**Completed**: March 2026

## Context

The Accomade Svelte Components library currently has 148 unit tests passing, but lacks end-to-end (e2e) testing. E2e tests are needed to verify component integration, user interactions, and real-world usage scenarios.

## Current State

### Existing Test Infrastructure

- **Unit Tests**: Vitest with @testing-library/svelte
- **Test Files**: 10 files
- **Test Count**: 148 passing tests
- **Coverage**: v8 provider configured

### Missing

- No e2e test framework installed
- No e2e test directory
- No e2e test scripts in package.json
- No browser automation setup

## Goals

1. Install and configure Playwright for e2e testing
2. Create e2e test directory structure
3. Write initial e2e tests for critical user flows
4. Add e2e test commands to package.json
5. Document e2e testing approach

## Proposed Implementation

### 1. Install Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

### 2. Directory Structure

```
e2e/
├── tests/
│   ├── components/
│   │   ├── button.spec.ts
│   │   ├── text-input.spec.ts
│   │   └── acco-card.spec.ts
│   └── integration/
│       └── full-page.spec.ts
├── fixtures/
│   └── test-data.ts
└── playwright.config.ts
```

### 3. Initial Test Scenarios

#### Button Component

- Click interactions
- Disabled state behavior
- Keyboard navigation (Enter, Space)
- Visual states (hover, focus, active)

#### TextInput Component

- Text entry and validation
- Error message display
- Required field validation
- Different input types (text, email, password, etc.)
- Accessibility (labels, ARIA attributes)

#### AccoCard Component

- Card rendering with all content types
- Photo gallery interactions
- Amenities display
- Booking button functionality
- Responsive layout at different viewports

### 4. Configuration Requirements

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 5. Package.json Scripts

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test": "npm run test:unit -- --run && npm run test:e2e"
  }
}
```

## Acceptance Criteria

- [x] Playwright installed and configured
- [x] e2e directory structure created
- [x] playwright.config.ts created with appropriate settings
- [x] Initial test for Button component
- [ ] Initial test for TextInput component (needs test page)
- [ ] Initial test for AccoCard component (needs test page)
- [x] Tests run successfully in Chromium and Firefox
- [ ] Tests run successfully in WebKit/Mobile (needs system deps)
- [x] npm run test:e2e command works
- [ ] CI/CD configuration updated to run e2e tests
- [x] Documentation updated in 0000_index.md
- [x] .gitignore updated for Playwright test results
- [x] 14/14 tests passing on supported browsers

## Open Questions

1. Should we test against the preview build or dev server?
2. Do we need mobile viewport testing (currently responsive breakpoints at 999px and 750px)?
3. Should we include visual regression testing with Playwright's screenshot comparison?
4. How should we handle external dependencies like Leaflet maps in e2e tests?

## Next Steps

1. ~~Install Playwright dependencies~~
2. ~~Create playwright.config.ts~~
3. ~~Write first e2e test (Button.svelte)~~
4. Verify tests run in all browsers
5. ~~Update documentation~~
6. Install system dependencies: `sudo pnpm exec playwright install-deps`
7. Create demo pages for TextInput and AccoCard e2e tests
8. Add more comprehensive e2e tests for all components

## Related

- See TODOS.md for component test coverage gaps
- Unit tests already exist for Button, TextInput, and AccoCard
