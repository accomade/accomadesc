# Calendar Component

Availability calendar component with grid and row display modes.

## Usage

```svelte
<script>
  import { Calendar } from 'accomadesc';

  const calendar = {
    id: 'calendar-1',
    kind: 'calendar',
    acco: 'beach-house',
    content: {
      url: '/calendar.ics',
      gridMonthNumbers: 3,
      gridFirstMonth: { offset: 0 },
      rowsMonthNumbers: 6,
      maxFutureYears: 2,
      maxPastYears: 1,
    },
  };
</script>

<Calendar {...calendar} />
```

## Grid Mode

Display availability in a grid layout:

```svelte
<Calendar
  content={{
    url: '/calendar.ics',
    gridMonthNumbers: 12,
    gridFirstMonth: { offset: 0 },
    gridMaxWidth: '1200px',
  }}
/>
```

## Row Mode

Display availability in a row layout:

```svelte
<Calendar
  content={{
    url: '/calendar.ics',
    rowsMonthNumbers: 6,
    rowsFirstMonth: { offset: 0 },
    rowsMaxWidth: '800px',
  }}
/>
```

## Props

| Prop    | Type            | Description              |
| ------- | --------------- | ------------------------ |
| id      | string          | Unique identifier        |
| kind    | 'calendar'      | Block type discriminator |
| content | CalendarContent | Calendar configuration   |

## Content Interface

```typescript
interface CalendarContent {
  url: string;
  toggleGridOffset?: number;
  gridMonthNumbers?: number;
  gridFirstMonth?: FirstMonth;
  gridMaxWidth?: string;
  toggleRowsOffset?: number;
  rowsMonthNumbers?: number;
  rowsFirstMonth?: FirstMonth;
  rowsMaxWidth?: string;
  maxFutureYears?: number;
  maxPastYears?: number;
}
```

## FirstMonth Configuration

```typescript
interface FirstMonth {
  offset?: number; // Months from current month
  month?: number; // Specific month (1-12)
  year?: number; // Specific year
}
```
