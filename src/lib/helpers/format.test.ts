import { describe, it, expect } from 'vitest';
import { format } from './format.js';

describe('format', () => {
  it('replaces single placeholder', () => {
    const result = format('Hello {{name}}!', { name: 'World' });
    expect(result).toBe('Hello World!');
  });

  it('replaces multiple placeholders', () => {
    const result = format('{{greeting}} {{name}}!', { greeting: 'Hello', name: 'World' });
    expect(result).toBe('Hello World!');
  });

  it('replaces same placeholder multiple times', () => {
    const result = format('{{name}} said {{name}} said hello', { name: 'Alice' });
    expect(result).toBe('Alice said Alice said hello');
  });

  it('returns original string when no placeholders match', () => {
    const result = format('No placeholders here', { name: 'World' });
    expect(result).toBe('No placeholders here');
  });

  it('returns original string when subst is empty', () => {
    const result = format('Hello {{name}}!', {});
    expect(result).toBe('Hello {{name}}!');
  });

  it('handles placeholders with underscores and numbers', () => {
    const result = format('User {{user_id}} has {{count}} items', { user_id: '123', count: '5' });
    expect(result).toBe('User 123 has 5 items');
  });

  it('handles empty formatString', () => {
    const result = format('', { key: 'value' });
    expect(result).toBe('');
  });

  it('handles special characters in replacement values', () => {
    const result = format('{{text}}', { text: 'Hello $world & <tags>' });
    expect(result).toBe('Hello $world & <tags>');
  });
});
