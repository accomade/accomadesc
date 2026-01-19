# AGENTS.md

This document provides guidelines for agents working with this codebase.

## Project Overview

This is a Svelte 5 component library (`asc` - Accomade Svelte Components) used across multiple Accomade products. It provides reusable UI components for accommodations including calendars, pricing displays, photo galleries, booking forms, and more.

## Build Commands

```bash
# Development server with hot reload
pnpm run dev

# Build library package (outputs to dist/)
pnpm run package

# Build with preview
pnpm run build
pnpm run preview

# Type checking
pnpm run check              # Run svelte-check once
pnpm run check:watch        # Watch mode

# Testing
pnpm run test               # Run all tests once
pnpm run test:unit          # Run vitest in watch mode

# Formatting
pnpm run format             # Format all files with Prettier
pnpm run lint               # Check formatting with Prettier

# Package publishing
pnpm run prepublishOnly     # Sync, package, and lint before publish
```

## Testing

Tests use Vitest. Create test files with `.test.ts` or `.test.js` extension alongside the code they test.

```bash
# Run all tests once
pnpm run test

# Run specific test file
pnpm run test:unit -- src/lib/helpers/debounce.test.ts

# Run tests matching pattern
pnpm run test:unit -- --testNamePattern="debounce"
```

## Code Style Guidelines

### Formatting (Prettier)

- Use tabs for indentation (Prettier config: `useTabs: false`, actually uses spaces)
- Single quotes for strings: `'example'`
- Trailing commas: `all`
- Print width: 100 characters
- Run `pnpm run format` before committing

### TypeScript

- Strict mode enabled in `tsconfig.json`
- No `any` types - use explicit types or `unknown` where appropriate
- Use interface for object types, type for unions/primitives
- Export all types from `$lib/types.ts` and `$lib/index.ts`
- Use Type Guards for discriminated unions (see `isAccoBlock`, `isCalendar`, etc. in `types.ts`)

### Svelte 5 Components

- Use Svelte 5 runes: `$props()`, `$derived()`, `$state()`, `$effect()`
- Destructure props in `let` declaration:
  ```svelte
  let { title, count = 0 }: { title: string; count?: number } = $props();
  ```
- Use `$derived()` for computed values
- Use `$state()` for reactive state
- Place script tag at top, then template, then styles
- Component files: PascalCase (e.g., `BookingRequest.svelte`)
- Sub-components in `$lib/basic/` for atomic UI elements

### State Management

- Use `.svelte.ts` files for class-based state (e.g., `SiteState.svelte.ts`)
- Implement `I18nFacade` interface for i18n support
- Svelte 5 state: `let count = $state(0);`
- Derived state: `let double = $derived(count * 2);`

### Imports

- Use `$lib` alias for absolute imports
- Separate imports by type: values, types, components
- Example:
  ```typescript
  import AmenitiesCore from '$lib/AmenitiesCore.svelte';
  import { type AccoCardContent, type I18nFacade } from './types.js';
  import { format } from '$lib/helpers/format.js';
  ```
- Re-export everything from `$lib/index.ts`

### Naming Conventions

- Components: PascalCase (`BookingRequest.svelte`)
- Type exports: Suffix with `I` for interfaces used as props (`CalendarI`, `PricingI`)
- Constants: SCREAMING_SNAKE_CASE (`PRICING_COLUMNS`, `BLOCK_KINDS`)
- Helper functions: camelCase (`formatDateFunc`, `translateWithLangFunc`)
- Block kinds: kebab-case (`'booking-request'`, `'calendar-grid'`)

### Error Handling

- Use `console.warn()` for missing translations or format strings
- Use `console.error()` for critical errors
- Return meaningful defaults or `[UNDEF]` placeholders
- Validate function parameters early

### Component Props Interface

- Define content interfaces separately (e.g., `BookingRequestContent`)
- Extend `AccoBlock` for components that need accommodation context
- Include optional props with `?` operator
- Example structure:
  ```typescript
  export interface BookingRequest extends AccoBlock {
    id: string;
    kind: 'booking-request';
    content: BookingRequestContent;
  }
  ```

### CSS/Styling

- Use CSS Grid for complex layouts
- Use CSS custom properties (`--acco-card-bg-color`)
- Responsive breakpoints: 999px and 750px
- Scoped styles within `<style>` blocks
- Mobile-first approach with media query overrides

### File Organization

```
src/lib/
├── *.svelte              # Main components
├── *.svelte.ts           # State classes
├── types.ts              # TypeScript interfaces
├── index.ts              # Re-exports
├── basic/                # Atomic components (Button, Icon, etc.)
├── helpers/              # Utility functions
└── names/                # Name generation utilities
```

### Block System

The library uses a block-based content system. Each block has:

- `id: string` - Unique identifier
- `kind: string` - Block type discriminator
- `content: T` - Block-specific content

Use type guards (`isBookingRequest()`, `isCalendar()`, etc.) for type narrowing.

### Internationalization

- Components accept `translateFunc`, `formatFunc`, `formatMoneyFunc`, `formatDateFunc`
- Language configuration in `LangConfig` interface
- Translation keys defined in site config
- Fallback to defaults when translation missing

## Key Dependencies

- Svelte 5.x with runes
- SvelteKit 2.x
- TypeScript 5.x
- Luxon for date handling
- Leaflet for maps
- Prettier + prettier-plugin-svelte
