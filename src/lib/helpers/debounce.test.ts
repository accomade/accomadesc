import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('executes immediately when no prior timestamp exists', async () => {
    const func = vi.fn().mockResolvedValue(true);
    const result = await debounce('test-id', func, { initialDelay: 0, debounceDelay: 10000 });
    expect(result).toBe(true);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('does not execute if called within debounce delay', async () => {
    const func = vi.fn().mockResolvedValue(true);
    await debounce('test-id', func, { initialDelay: 0, debounceDelay: 1000 });
    func.mockClear();
    const result = await debounce('test-id', func, { initialDelay: 0, debounceDelay: 1000 });
    expect(result).toBe(false);
    expect(func).not.toHaveBeenCalled();
  });

  it('executes after debounce delay has passed', async () => {
    const func = vi.fn().mockResolvedValue(true);
    await debounce('test-id', func, { initialDelay: 0, debounceDelay: 1000 });
    func.mockClear();
    vi.advanceTimersByTime(1000);
    const result = await debounce('test-id', func, { initialDelay: 0, debounceDelay: 1000 });
    expect(result).toBe(true);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('handles different ids independently', async () => {
    const func1 = vi.fn().mockResolvedValue(true);
    const func2 = vi.fn().mockResolvedValue(true);
    await debounce('id-1', func1);
    await debounce('id-2', func2);
    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
  });
});
