import { describe, it, expect } from 'vitest';
import { normalizeDate } from './normalizeDate.js';

describe('normalizeDate', () => {
  it('returns today at noon UTC when date is undefined', () => {
    const result = normalizeDate(undefined);
    expect(result.hour).toBe(12);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.millisecond).toBe(0);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC when date is null', () => {
    const result = normalizeDate(null);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC when date is empty string', () => {
    const result = normalizeDate('');
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC when date is falsy (0)', () => {
    const result = normalizeDate(0);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('converts JavaScript Date object to DateTime at noon UTC', () => {
    const jsDate = new Date(2024, 5, 15, 10, 30, 0);
    const result = normalizeDate(jsDate);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(6);
    expect(result.day).toBe(15);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC for invalid Date object', () => {
    const invalidDate = new Date('invalid');
    const result = normalizeDate(invalidDate);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('converts millis timestamp to DateTime at noon UTC', () => {
    const millis = new Date(2024, 11, 25).getTime();
    const result = normalizeDate(millis);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(12);
    expect(result.day).toBe(25);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('handles object with valueOf method returning millis', () => {
    const customDate = {
      valueOf: () => new Date(2024, 3, 10).getTime(),
    };
    const result = normalizeDate(customDate);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(4);
    expect(result.day).toBe(10);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('parses ISO date string', () => {
    const result = normalizeDate('2024-07-20');
    expect(result.year).toBe(2024);
    expect(result.month).toBe(7);
    expect(result.day).toBe(20);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('parses ISO date-time string', () => {
    const result = normalizeDate('2024-07-20T14:30:00');
    expect(result.year).toBe(2024);
    expect(result.month).toBe(7);
    expect(result.day).toBe(20);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('parses SQL date format', () => {
    const result = normalizeDate('2024-11-15 08:12:31');
    expect(result.year).toBe(2024);
    expect(result.month).toBe(11);
    expect(result.day).toBe(15);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC for unparseable string', () => {
    const result = normalizeDate('not-a-date-at-all');
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('returns today at noon UTC for unparseable millis (negative)', () => {
    const result = normalizeDate(-999999999999999);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });

  it('handles Luxon DateTime input', () => {
    const luxonDate = {
      isValid: true,
      year: 2024,
      month: 8,
      day: 15,
      hour: 0,
      offset: 0,
      valueOf: () => new Date(2024, 7, 15).getTime(),
    };
    const result = normalizeDate(luxonDate as any);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(8);
    expect(result.day).toBe(15);
    expect(result.hour).toBe(12);
    expect(result.offset).toBe(0);
  });
});
