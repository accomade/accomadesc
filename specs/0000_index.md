# Application State Index

This directory contains specifications and documentation about the Accomade Svelte Components library.

## Current Version

- **Version**: 0.4.5
- **Last Updated**: March 2026

## Test Status

- **Unit Tests**: 148 tests passing across 10 test files ✓
- **e2e Tests**: 14/14 tests passing on Chromium & Firefox ✓
- **TypeScript**: 0 errors ✓
- **Note**: WebKit/Mobile need system deps (libicu74, libxml2, libflite1)

## Test Coverage

### Unit Tests (Complete)

1. **Button.svelte** - 12 tests ✓
2. **TextInput.svelte** - 41 tests ✓
3. **AccoCard.svelte** - 17 tests ✓
4. **Helper functions** - 35 tests ✓
5. **State classes** - 22 tests ✓
6. **Type guards** - 21 tests ✓

### Components Without Tests

- Calendar.svelte
- Pricing.svelte
- BookingRequest.svelte
- Photo.svelte
- LeafletMap.svelte

## Spec Files

| ID   | Title                          | Status      |
| ---- | ------------------------------ | ----------- |
| 0040 | e2e Testing Setup              | Complete    |
| 0050 | e2e Test Issues & Improvements | In Progress |

## Commands

```bash
# Run unit tests
pnpm run test

# Run e2e tests
pnpm run test:e2e
pnpm run test:e2e:ui      # Interactive UI mode
pnpm run test:e2e:debug   # Debug mode

# Run all tests (unit + e2e)
pnpm run test:all

# Type checking
pnpm run check

# Build package
pnpm run package
```

## Architecture

- **Framework**: Svelte 5 with runes
- **Build Tool**: Vite
- **Test Runner**: Vitest (unit), Playwright (e2e - planned)
- **Package Manager**: pnpm

## Key Directories

- `src/lib/` - Component library source
- `src/lib/basic/` - Atomic UI components
- `src/lib/helpers/` - Utility functions
- `dist/` - Built package output
