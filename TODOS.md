# TODOS.md

This document outlines potential improvements and next steps for the Accomade Svelte Components library.

## Documentation

- ~~Provide an overiew of Accomade Svelte Components intent and usage in README.md~~ ✓ Updated README with library overview, installation, usage examples, and component documentation
- ~~Add a /docs folder containing small usage examples for every component provided~~ ✓ Created docs/ folder with examples for AccoCard, Button, Calendar, and Pricing components

## Testing

- ~~Add test suite~~: No tests exist (0 test files found). Create `.test.ts` or `.test.js` files for:
  - ~~Helper functions (`debounce`, `format`, `normalizeDate`, `readICS`, `moneyFormats`)~~ ✓ Added 35 tests
  - ~~State classes (`SiteState.svelte.ts`, `GlobalState`)~~ ✓ Added 22 tests
  - ~~Type guards (`isAccoBlock`, `isCalendar`, etc.)~~ ✓ Added 21 type guard tests
  - Core components (`Button`, `TextInput`, `AccoCard`) - Pending
- **Add coverage reporting**: Configure Vitest with coverage (Codecov, Coveralls, or simple text report) - Added v8 coverage provider to vitest.config.ts
- Cleanup - remove trivial tests

**Total: 78 tests passing across 7 test files**

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
- **Remaining TypeScript errors**: ~29 errors remaining, primarily in `src/routes/full/+page.svelte` demo page - See "Legacy Cleanup" section

## Code Quality

- **Refactor large components**: Several components exceed 300 lines:
  - `Pricing.svelte` (524 lines) - Extract table rendering to sub-components
  - `Button.svelte` (332 lines) - Complex styling logic could be simplified
  - `PageComponent.svelte` (430 lines) - Consider breaking into Header/Footer/Nav components
  - `OccuPlanPicker.svelte` (575 lines) - Large editor component
  - `full/+page.svelte` (740 lines) - Demo page could be split
- **Extract repetitive table logic**: `Pricing.svelte` has duplicate table rendering code for different breakpoints (wide/medium/mobile). Extract to reusable table component or snippets.
- **Consolidate duplicate code**: The `colOutputRange` and `colOutputStaticRange` functions in `Pricing.svelte` are nearly identical
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
  - Splitting into multiple files by category
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
- **Icon optimization**: `icons.ts` at 109KB affects bundle size. Consider dynamic imports
- **Component lazy loading**: Some components (`OccuPlanPicker`, `PageComponent`) are large and used conditionally

## Dependencies

- **Audit dependencies**: Some packages may be outdated:
  - `gdpr-cooco-banner: ^0.0.13` - Very old version, check for updates
  - `@dinero.js/currencies: 2.0.0-alpha.14` - Alpha version
- **Remove unused imports**: Several components have unused imports

## Internationalization

- **Add missing translation fallbacks**: Some components return `[UNDEF]` without graceful degradation
- **Language detection**: Improve automatic language detection logic

## CSS & Styling

## Error Handling

- **Add error boundaries**: Wrap components in Svelte error boundaries
- **Improve validation**: Add Valibot for props validation in development
- **Better error messages**: Console warnings should include component context
- **User-facing errors**: Add toast/notification system for form errors

## Accessibility (a11y)

- **Audit ARIA attributes**: Some components may need better ARIA support
- **Keyboard navigation**: Test tab order in complex components
- **Screen reader testing**: Verify content is announced correctly

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
- **Update README**: The README contains outdated create-svelte template content
