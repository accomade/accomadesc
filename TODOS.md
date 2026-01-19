# TODOS.md

This document outlines potential improvements and next steps for the Accomade Svelte Components library.

## Current State (Jan 2026)

- **Version**: 0.4.0
- **TypeScript**: All errors resolved (0 errors)
- **Tests**: 148 tests passing across 10 test files
- **Build**: Package builds successfully with `npm run package`

## Recent Changes

### TypeScript & Testing Improvements

- **TypeScript errors fixed**: Resolved 3 event handler type errors in `TextInput.svelte`:
  - Added `InputEventHandler` and `ClipboardEventHandler` types
  - Properly typed `extraAttrs` state to include event handler types
  - Fixed type casting for `onchange`, `oninput`, and `onpaste` props
- **Added jest-dom type declarations**: Created `src/vitest-jest-dom.d.ts` to provide TypeScript types for:
  - `toBeInTheDocument()`
  - `toBeRequired()`
  - `toHaveAttribute()`
  - `toHaveStyle()`
- **Pricing.svelte refactoring**: Consolidated duplicate `colOutputRange` and `colOutputStaticRange` functions into single `colOutput` function, extracted repetitive table rendering logic into reusable `pricingTable` snippet, reducing file from 524 to 436 lines
- **TypeScript errors resolved**: All ~29 TypeScript errors in `src/routes/full/+page.svelte` and routes folder have been fixed. TypeScript check now passes with 0 errors.
- **Dependency cleanup**: Removed unused `@dinero.js/currencies` dependency (not imported anywhere in codebase)
- **Testing setup**: Added `@testing-library/svelte` and `@testing-library/dom` for future component testing (Svelte 5 testing requires additional setup)
- **Test coverage**: All 78 existing tests pass across 7 test files
- **Svelte 5 component testing enabled**: Configured Vitest with proper Svelte 5 + @testing-library/svelte setup:
  - Created `vitest.setup.ts` with mocks for `$app/environment` and `$app/stores`
  - Added `ResizeObserver` mock for components that use it (Photo.svelte)
  - Added `@types/node` for path resolution
  - Configured `vitest.config.ts` with svelte plugin, alias resolution, and jsdom environment
  - Added 12 component tests for Button.svelte covering rendering, props, and behavior
  - Added 41 component tests for TextInput.svelte covering all input types, validation, accessibility, and event handlers
  - Added 17 component tests for AccoCard.svelte covering rendering, props, conditional sub-components, and i18n handling
  - **Total: 148 tests passing across 10 test files**

## Documentation

- ~~Provide an overiew of Accomade Svelte Components intent and usage in README.md~~ ✓ Updated README with library overview, installation, usage examples, and component documentation
- ~~Add a /docs folder containing small usage examples for every component provided~~ ✓ Created docs/ folder with examples for AccoCard, Button, Calendar, and Pricing components

## Testing

- ~~Add test suite~~: No tests exist (0 test files found). Create `.test.ts` or `.test.js` files for:
  - ~~Helper functions (`debounce`, `format`, `normalizeDate`, `readICS`, `moneyFormats`)~~ ✓ Added 35 tests
  - ~~State classes (`SiteState.svelte.ts`, `GlobalState`)~~ ✓ Added 22 tests
  - ~~Type guards (`isAccoBlock`, `isCalendar`, etc.)~~ ✓ Added 21 type guard tests
- **Add component tests**: Core components need tests. Svelte 5 component testing now working:
  - ~~Button.svelte~~ ✓ Added 12 tests with @testing-library/svelte (rendering, props, behavior)
  - ~~TextInput.svelte~~ ✓ Added 41 tests with @testing-library/svelte (all input types, validation, accessibility, event handlers)
  - ~~AccoCard.svelte~~ ✓ Added 17 tests with @testing-library/svelte (rendering, props, conditional sub-components, i18n)
- **Add coverage reporting**: Configure Vitest with coverage (Codecov, Coveralls, or simple text report) - Added v8 coverage provider to vitest.config.ts
- **Add more component tests**: Core components still need testing:
  - Calendar.svelte
  - Pricing.svelte
  - BookingRequest.svelte
  - Photo.svelte
  - LeafletMap.svelte
- **Add integration tests**: Test component interactions and state management

**Total: 148 tests passing across 10 test files**

## TypeScript Improvements

- **Remove `any` types**: Found 3+ instances using `any`:
  - ~~`types.ts:497` - `formatFunc?: (formatter: string, props: Record<string, any>)`~~ ✓ Changed to `Record<string, unknown>`
  - ~~`normalizeDate.ts:4` - `date?: any`~~ ✓ Changed to `unknown` with proper type guards
  - ~~`SiteState.svelte.ts:92` - `props: Record<string, any>`~~ ✓ Changed to `Record<string, unknown>` with type assertion
- **Remove `@ts-ignore`**: Found 2 instances in `normalizeDate.ts:51,58`
  - ~~These suppress Luxon type checking for `fromHTTP` and `fromSQL`~~ ✓ Removed by adding `typeof date === 'string'` type guards
- **Enable stricter checks**: Added to `tsconfig.json`:
  - `"noUncheckedIndexedAccess": true` - Catches undefined access on indexed types
  - `"noImplicitReturns": true` - Ensures all code paths return a value
  - `"noFallthroughCasesInSwitch": true` - Prevents switch case fallthrough
  - Fixed 18+ undefined access issues in lib/ folder (readICS.ts, SiteState.svelte.ts, state.svelte.ts, debounce.ts, moneyFormats.test.ts, icons.ts, CalendarAvailable.svelte, PhotoGallery.svelte, MainNav.svelte, PageComponent.svelte)
- **Fixed routes folder errors**: Added proper type guards and fallbacks to 4 I18n.svelte.ts files:
  - `src/routes/I18n.svelte.ts` - translateFunc, translateWithLangFunc, formatFunc, formatMoneyFunc
  - `src/routes/[lang]/heropage/I18n.svelte.ts` - same fixes
  - `src/routes/[lang]/heropage_ham/I18n.svelte.ts` - same fixes
  - `src/routes/[lang]/imprint/I18n.svelte.ts` - same fixes
  - Fixed PricingEntryEditor.svelte translation access with optional chaining
- **TypeScript check passes**: All ~29 TypeScript errors in `src/routes/full/+page.svelte` have been fixed. Run `npm run check` for verification.

## Code Quality

- **Refactor large components**: Several components exceed 300 lines:
  - ~~`Pricing.svelte` (524 lines)~~ - Extracted table rendering to reusable snippet (now 436 lines)
  - ~~`TextInput.svelte` (364 lines)~~ - Consolidated 5 repetitive input type blocks into single input with reactive type switching (now 283 lines, 22% reduction)
  - `Button.svelte` (332 lines) - Complex styling logic could be simplified
  - `PageComponent.svelte` (430 lines) - Consider breaking into Header/Footer/Nav components
  - `OccuPlanPicker.svelte` (575 lines) - Large editor component
  - `full/+page.svelte` (740 lines) - Demo page could be split
- **Extract repetitive table logic**: `Pricing.svelte` has duplicate table rendering code for different breakpoints (wide/medium/mobile). Extract to reusable table component or snippets.
  - ✓ **Consolidated duplicate functions**: Merged `colOutputRange` and `colOutputStaticRange` into single `colOutput` function with type guard (`isStaticRange`)
  - ✓ **Extracted table rendering snippet**: Created reusable `pricingTable` snippet that handles all 3 breakpoint layouts
  - **Result**: Reduced `Pricing.svelte` from 524 lines to 436 lines (~17% reduction)
- **Consolidate duplicate code**: The `colOutputRange` and `colOutputStaticRange` functions in `Pricing.svelte` are nearly identical
  - ✓ **Merged into single function**: Now uses `colOutput(range, col)` with `isStaticRange` type guard for timeRange formatting
- **Remove commented-out code**: Several files contain commented code (e.g., `debounce.ts:23,45,54,60,63`) - Removed in tests
- **Fix format function bug**: The `format` function only replaced first occurrence of each placeholder. Fixed to use global regex.

## Documentation

- **Add component documentation**: Use JSDoc comments for:
  - All exported functions
  - Component props interfaces
  - Type definitions
- **Create usage examples**: Add Storybook or demo pages for each component
- **Document block system**: Expand documentation on how blocks work, type guards, and extension patterns
- **Add inline comments**: Complex logic (e.g., `normalizeDate`, debounce implementation) needs explanation

## Architecture & Structure

- **Organize icons**: `icons.ts` (109KB) is very large. Consider:
  - ~~Splitting into multiple files by category~~ ✓ Split into icons/navigation.ts, icons/actions.ts, icons/ui.ts (~24KB total)
  - Lazy-loading icons only when needed
  - Using SVG sprites instead of inline strings
- **Add barrel exports**: Currently `index.ts` re-exports everything but internal structure could be improved:
  - Consider `src/lib/components/*.ts` for component exports
  - Add explicit exports for subdirectories (`basic/`, `helpers/`, etc.)
- **SVG consolidation**: The `svg/` directory contains 16 individual SVG components. Consider:
  - A single `Icon` component that accepts SVG paths as props
  - Icon sprites or a library like `unplugin-icons`

## Performance

- **Code splitting**: Large components like `Pricing` could be lazy-loaded
- **Tree-shaking**: Ensure unused helpers aren't bundled
- **Icon optimization**: icons.ts reduced from 107KB to ~24KB by splitting into categorized files
- **Component lazy loading**: Some components (`OccuPlanPicker`, `PageComponent`) are large and used conditionally

## Dependencies

- **Audit dependencies**: Package versions reviewed:
  - `gdpr-cooco-banner: ^0.0.13` - Latest available version (actively used for cookie consent translations)
  - `@dinero.js/currencies: 2.0.0-alpha.14` - Removed! Not actively used in codebase (replaced with Intl.NumberFormat, only referenced in commented-out type definitions)
- **Remove unused imports**: Several components have unused imports
- **Removed unused dependency**: `@dinero.js/currencies` has been removed as it's not imported anywhere in the codebase

## Internationalization

- **Add missing translation fallbacks**: Some components return `[UNDEF]` without graceful degradation
- **Language detection**: Improve automatic language detection logic

## CSS & Styling

- **Add CSS variable documentation**: Document all CSS custom properties used in components
- **Theme consistency**: Ensure all components use CSS variables for colors, spacing, and fonts
- **Responsive design audit**: Verify all components work at 999px and 750px breakpoints

## Error Handling

- **Add error boundaries**: Wrap components in Svelte error boundaries
- **Improve validation**: Add Valibot for props validation in development
- **Better error messages**: Console warnings should include component context
- **User-facing errors**: Add toast/notification system for form errors

## Accessibility (a11y)

- **Audit ARIA attributes**: Some components may need better ARIA support
- **Keyboard navigation**: Test tab order in complex components
- **Screen reader testing**: Verify content is announced correctly
- **TextInput accessibility improvements**: Added:
  - `aria-invalid` attribute when input is invalid
  - `aria-describedby` to link inputs with validation messages
  - `aria-required` for required fields
  - `autocomplete` attribute for email, tel, and password types
  - `aria-live="polite"` for validation message announcements

## Build & Release

- **Versioning strategy**: Add CHANGELOG.md and follow semantic versioning
- **Automated releases**: Set up auto-changelog and release workflows
- **Bundle analysis**: Add `rollup-plugin-analyzer` or similar to monitor bundle size
- **Doc generation**: Generate API docs from TypeScript types

## Code Organization

- **Consolidate similar components**: Calendar variants (`Calendar`, `CalendarGrid`, `CalendarRows`, `CalendarAvailable`) could share more code
- **Add domain directories**: Group related functionality:
  - `calendar/` - All calendar components
  - `pricing/` - All pricing components
  - `booking/` - Booking-related components

## Security

- **Audit dependencies**: Run `npm audit` and fix vulnerabilities
- **CSP headers**: Add Content Security Policy for the library consumers
- **Sanitize inputs**: Form components (`ContactForm`, `BookingRequest`) should sanitize user input

## Legacy Cleanup ✓

- **Remove dead code**: Some files reference non-existent components or imports
- **Clean up routes**: `src/routes/full/` and `src/routes/css.ts` seem to be demo/testing code
  - **Progress**: Fixed 4 I18n.svelte.ts files (src/routes/I18n.svelte.ts, [lang]/heropage/I18n.svelte.ts, [lang]/heropage_ham/I18n.svelte.ts, [lang]/imprint/I18n.svelte.ts) - added proper type guards and fallbacks for translation/formats access
  - Fixed PricingEntryEditor.svelte translation access issues
  - Fixed [lang]/imprint/+page.svelte undefined pathLang issue
  - Fixed ~29 TypeScript errors in `src/routes/full/+page.svelte`: Moved `i18n` declaration to top of script, added `getTranslation()` helper function, and added state variables for bound translation values to handle `noUncheckedIndexedAccess` strictness
  - All TypeScript errors now resolved (npm run check passes with 0 errors)
- **Update README**: The README contains outdated create-svelte template content

## Remaining Work

### High Priority

1. **Add more component tests** - Only 3 components have tests (Button, TextInput, AccoCard)
2. **Refactor PageComponent.svelte** - At 430 lines, it should be split into smaller components
3. **Add JSDoc documentation** - Components need better documentation for API consumers
4. **Fix prerender build issue** - `npm run build` fails due to missing `/[lang]/new-site-state` route

### Medium Priority

1. **Add coverage reporting** - Configure v8 coverage to generate reports
2. **Create Storybook stories** - Add interactive examples for components
3. **Add CHANGELOG.md** - Document changes for releases
4. **Refactor Button.svelte** - 332 lines, complex styling logic

### Low Priority

1. **Add domain directories** - Group calendar, pricing, booking components
2. **Add error boundaries** - Wrap components for graceful error handling
3. **Icon optimization** - Consider SVG sprites or lazy loading
4. **Bundle analysis** - Monitor bundle size with rollup-plugin-analyzer
