import { describe, it, expect } from 'vitest';
import { MoneyFormats } from './moneyFormats.js';

describe('MoneyFormats', () => {
  it('has format for English locale', () => {
    expect(MoneyFormats.en).toBeDefined();
    expect(MoneyFormats.en.format(100)).toBe('€100.00');
  });

  it('has format for German locale', () => {
    expect(MoneyFormats.de).toBeDefined();
    expect(MoneyFormats.de.format(100)).toBe('100,00 €');
  });

  it('has format for French locale', () => {
    expect(MoneyFormats.fr).toBeDefined();
    expect(MoneyFormats.fr.format(100)).toBe('100,00 €');
  });

  it('has format for Polish locale', () => {
    expect(MoneyFormats.pl).toBeDefined();
    expect(MoneyFormats.pl.format(100)).toBe('100,00 €');
  });

  it('has format for Spanish locale', () => {
    expect(MoneyFormats.es).toBeDefined();
    expect(MoneyFormats.es.format(100)).toBe('100,00 €');
  });

  it('formats decimal amounts correctly', () => {
    expect(MoneyFormats.en.format(99.99)).toBe('€99.99');
    expect(MoneyFormats.de.format(99.99)).toBe('99,99 €');
  });

  it('formats large amounts correctly', () => {
    expect(MoneyFormats.en.format(1234.56)).toBe('€1,234.56');
    expect(MoneyFormats.de.format(1234.56)).toBe('1.234,56 €');
  });

  it('formats zero correctly', () => {
    expect(MoneyFormats.en.format(0)).toBe('€0.00');
    expect(MoneyFormats.de.format(0)).toBe('0,00 €');
  });

  it('all formats use EUR symbol', () => {
    const formats = [
      MoneyFormats.en,
      MoneyFormats.de,
      MoneyFormats.fr,
      MoneyFormats.pl,
      MoneyFormats.es,
    ];
    formats.forEach((format) => {
      expect(format.formatToParts(100).find((p) => p.type === 'currency')?.value).toBe('€');
    });
  });
});
