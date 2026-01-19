# Pricing Component

Detailed pricing table for accommodation rates.

## Usage

```svelte
<script>
  import { Pricing } from 'accomadesc';

  const pricing = {
    id: 'pricing-1',
    kind: 'pricing',
    acco: 'beach-house',
    content: {
      global: {
        perNightPrice: 150,
        numberOfGuestsBase: 2,
        numberOfGuestsMax: 4,
        minNumberOfNights: 2,
        additionalPersonPrice1: 25,
        additionalPersonText1: 'per extra person/night',
      },
      staticRanges: [
        {
          from: { month: 6, day: 1 },
          to: { month: 8, day: 31 },
          entry: {
            perNightPrice: 200,
            firstNightPrice: 180,
          },
        },
        {
          from: { month: 12, day: 20 },
          to: { month: 1, day: 5 },
          entry: {
            perNightPrice: 220,
            firstNightPrice: 200,
          },
        },
      ],
      ranges: [
        {
          from: '2024-04-01',
          to: '2024-05-31',
          entry: {
            perNightPrice: 130,
            minNumberOfNights: 1,
          },
        },
      ],
      footnote: '* Holiday periods may have different pricing',
    },
  };
</script>

<Pricing {...pricing} />
```

## Columns

The pricing table supports these columns:

- `timeRange` - Date range description
- `firstNight` - First night price
- `eachNight` - Per night price
- `peopleNum` - Number of guests
- `extraPerson` - Extra person pricing
- `minNumNights` - Minimum nights stay

## Props

| Prop    | Type           | Description              |
| ------- | -------------- | ------------------------ |
| id      | string         | Unique identifier        |
| kind    | 'pricing'      | Block type discriminator |
| content | PricingContent | Pricing configuration    |

## Content Interface

```typescript
interface PricingContent {
  global: PricingEntry;
  staticRanges?: StaticPricingRange[];
  ranges?: PricingRange[];
  entries?: PricingRange[];
  columns?: PricingColumn[];
  footnote?: string;
}

interface PricingEntry {
  firstNightPrice?: number;
  perNightPrice: number;
  numberOfGuestsBase?: number;
  numberOfGuestsMax?: number;
  minNumberOfNights?: number;
  additionalPersonPrice1?: number;
  additionalPersonPrice2?: number;
  additionalPersonPrice3?: number;
  additionalPersonText1?: string;
  additionalPersonText2?: string;
  additionalPersonText3?: string;
}
```
