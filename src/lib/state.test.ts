import { describe, it, expect } from 'vitest';
import { GlobalState, GLOBAL_STATE } from './state.svelte.js';

describe('GlobalState', () => {
  describe('constructor', () => {
    it('initializes with provided disableLinks value', () => {
      const state = new GlobalState(true);
      expect(state.disableLinks).toBe(true);
    });

    it('initializes with false when not provided', () => {
      const state = new GlobalState(false);
      expect(state.disableLinks).toBe(false);
    });
  });

  describe('disableLinks', () => {
    it('can be modified', () => {
      const state = new GlobalState(false);
      state.disableLinks = true;
      expect(state.disableLinks).toBe(true);
    });

    it('can be toggled multiple times', () => {
      const state = new GlobalState(false);
      state.disableLinks = true;
      state.disableLinks = false;
      state.disableLinks = true;
      expect(state.disableLinks).toBe(true);
    });
  });

  describe('GLOBAL_STATE symbol', () => {
    it('is defined', () => {
      expect(GLOBAL_STATE).toBeDefined();
      expect(typeof GLOBAL_STATE).toBe('symbol');
    });
  });
});
