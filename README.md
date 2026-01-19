# accomadesc (Accomade Svelte Components)

A collection of Svelte 5 components used throughout Accomade products and websites. Provides reusable UI components for accommodation listings including calendars, pricing displays, photo galleries, booking forms, and more.

## Installation

```bash
npm install accomadesc
```

Peer dependencies (must be installed separately):

```bash
npm install svelte @sveltejs/kit
```

## Quick Start

```svelte
<script>
  import { Button, AccoCard } from 'accomadesc';

  const card = {
    id: '1',
    kind: 'acco-card',
    content: {
      title: 'Beach House',
      photos: [{ url: '/house.jpg', alt: 'Beach house' }],
      prices: { from: 150, to: 300, currency: 'EUR' },
      amenities: ['wifi', 'parking'],
      url: '/beach-house',
    },
  };
</script>

<AccoCard {...card} />
<Button variant="primary">Book Now</Button>
```

## Block System

The library uses a block-based content system. Each block has:

- `id: string` - Unique identifier
- `kind: string` - Block type discriminator
- `content: T` - Block-specific content

Use type guards for type narrowing:

```typescript
import { isBookingRequest, type AccoBlock } from 'accomadesc';

function processBlock(block: AccoBlock) {
  if (isBookingRequest(block)) {
    // TypeScript knows block is BookingRequest
  }
}
```

## Core Components

### Basic UI

- `Button` - Multi-variant button component
- `TextInput` - Form text input with validation
- `Icon` - SVG icon renderer
- `Avatar` - User avatar display
- `Spinner` - Loading indicator
- `Notes` - Annotations and notes

### Content Display

- `AccoCard` - Accommodation summary card
- `AccoDescription` - Property description
- `AmenitiesCore` - Amenities display
- `Photo` / `PhotoGallery` - Image handling
- `Section` / `Text` - Content sections
- `LeafletMap` - Location map
- `Weather` - Weather information

### Booking & Calendar

- `Calendar` - Availability calendar
- `CalendarGrid` - Grid-based calendar view
- `CalendarRows` - Row-based calendar view
- `CalendarAvailable` - Availability summary
- `BookingRequest` - Booking request form
- `ContactForm` - Contact form

### Pricing

- `Pricing` - Detailed pricing table
- `PricingShort` - Compact pricing display

### Layout

- `PageComponent` - Full page wrapper
- `PageHeader` / `PageFooter` - Page sections
- `MainNav` / `NavItem` - Navigation

## Internationalization

Components accept i18n functions as props:

```svelte
<script>
  import { BookingRequest } from 'accomadesc';

  let props = {
    translateFunc: (key: string) => translations[key],
    formatMoneyFunc: (amount: number, currency: string) =>
      new Intl.NumberFormat().format(amount) + ' ' + currency,
    formatDateFunc: (date: Date) => date.toLocaleDateString(),
  };
</script>

<BookingRequest {...props} />
```

## State Management

Use `SiteState` for application state:

```typescript
import { SiteState } from 'accomadesc';

const site = new SiteState({
  lang: 'en',
  siteConfig: { ... },
  translateFunc: (key) => ...,
  formatMoneyFunc: (amount, currency) => ...,
  formatDateFunc: (date) => ...,
});
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Run tests
pnpm run test

# Type check
pnpm run check

# Format code
pnpm run format

# Build library
pnpm run package
```

## License

MIT
