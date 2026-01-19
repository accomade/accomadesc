import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
  interface AsymmetricMatchersContaining {
    toBeInTheDocument(): Assertion<HTMLElement>;
    toBeRequired(): Assertion<HTMLElement>;
    toHaveAttribute: (attr: string, value?: string) => Assertion<HTMLElement>;
    toHaveStyle: (styles: Record<string, string | number>) => Assertion<HTMLElement | null>;
  }

  interface Assertion {
    toBeInTheDocument(): Assertion<HTMLElement>;
    toBeRequired(): Assertion<HTMLElement>;
    toHaveAttribute(attr: string, value?: string): Assertion<HTMLElement>;
    toHaveStyle(styles: Record<string, string | number>): Assertion<HTMLElement | null>;
  }
}
