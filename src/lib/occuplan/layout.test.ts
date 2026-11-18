import { describe, expect, it } from 'vitest';
import { resolveCalendarView } from './layout.js';

describe('resolveCalendarView', () => {
  it('starts with grid before a width is measured', () => {
    expect(resolveCalendarView('auto', 0, 640, 640)).toBe('grid');
  });

  it('keeps grid on narrow screens in auto mode', () => {
    expect(resolveCalendarView('auto', 375, 640, 640)).toBe('grid');
  });

  it('switches to rows on wide screens in auto mode', () => {
    expect(resolveCalendarView('auto', 1200, 640, 640)).toBe('rows');
  });

  it('stays on grid between the hysteresis thresholds', () => {
    expect(resolveCalendarView('auto', 700, 600, 800)).toBe('grid');
  });

  it('forces grid regardless of width', () => {
    expect(resolveCalendarView('grid', 1200, 640, 640)).toBe('grid');
    expect(resolveCalendarView('grid', 375, 640, 640)).toBe('grid');
  });

  it('forces rows regardless of width when explicitly requested', () => {
    expect(resolveCalendarView('rows', 375, 640, 640)).toBe('rows');
    expect(resolveCalendarView('rows', 1200, 640, 640)).toBe('rows');
  });

  it('treats a missing layout as auto', () => {
    expect(resolveCalendarView(undefined, 375, 640, 640)).toBe('grid');
    expect(resolveCalendarView(undefined, 1200, 640, 640)).toBe('rows');
  });
});
