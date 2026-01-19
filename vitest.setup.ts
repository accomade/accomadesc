import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('$app/environment', () => ({
  browser: true,
  dev: true,
  building: false,
  version: '5.0.0',
}));

vi.mock('$app/stores', () => ({
  page: vi.fn(),
  navigating: vi.fn(),
  updated: vi.fn(),
}));
