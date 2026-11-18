import type { CalendarLayout } from './state.svelte.js';

export type CalendarView = 'grid' | 'rows';

/**
 * Resolves which calendar view to render.
 *
 * Before a width is measured (SSR, JS disabled, zero-width container) the grid
 * is returned, so narrow screens never start with the rows view. In `auto`
 * mode a width below `gridOffset` selects grid and a width above `rowsOffset`
 * selects rows; widths between the thresholds stay on grid.
 */
export const resolveCalendarView = (
  layout: CalendarLayout | undefined,
  width: number,
  gridOffset: number,
  rowsOffset: number,
): CalendarView => {
  const mode = layout ?? 'auto';

  if (mode === 'grid') return 'grid';
  if (mode === 'rows') return 'rows';

  if (width <= 0) return 'grid';
  if (width < gridOffset) return 'grid';
  if (width > rowsOffset) return 'rows';

  return 'grid';
};
