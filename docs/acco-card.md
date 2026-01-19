# AccoCard Component

Displays an accommodation summary card with photo, pricing, and availability.

## Usage

```svelte
<script>
  import { AccoCard } from 'accomadesc';

  const card = {
    id: '1',
    kind: 'acco-card',
    acco: 'beach-house',
    content: {
      displayName: 'Beach House',
      coverPhoto: {
        photoPath: '/images/house.jpg',
        alt: 'Beautiful beach house',
        height: '200px',
        width: '100%',
      },
      slug: '/beach-house',
      pricing: {
        id: 'pricing-1',
        kind: 'pricing-short',
        content: {
          global: { perNightPrice: 150 },
          showMinimum: true,
        },
      },
      avail: {
        id: 'avail-1',
        kind: 'calendar-available',
        content: { url: '/calendar.ics', search: [2024, 6, 1] },
      },
      amenities: {
        id: 'amenities-1',
        kind: 'amenities-core',
        content: {
          peopleMin: 2,
          peopleMax: 4,
          size: 80,
          bedRooms: 2,
          bathRooms: 1,
          pets: true,
          wifi: true,
          parking: true,
          smoking: false,
          ac: true,
          tv: true,
        },
      },
    },
  };
</script>

<AccoCard {...card} />
```

## Props

| Prop    | Type            | Description              |
| ------- | --------------- | ------------------------ |
| id      | string          | Unique identifier        |
| kind    | 'acco-card'     | Block type discriminator |
| content | AccoCardContent | Card content             |

## Content Interface

```typescript
interface AccoCardContent {
  displayName: string;
  coverPhoto: PhotoContent;
  slug: string;
  pricing: PricingShort;
  avail: CalendarAvailable;
  amenities: AmenitiesCore;
}
```
