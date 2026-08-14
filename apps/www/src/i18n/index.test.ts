import { describe, expect, it } from 'vitest';
import { locales, m } from './index';

describe('paraglide scaffolding', () => {
  it('activates english only', () => {
    expect(locales).toEqual(['en']);
  });

  it('compiles messages into callable functions', () => {
    expect(typeof m.footer_rights).toBe('function');
    expect(m.footer_rights({ year: 2026 })).toBe(
      '© 2026 Bernardo Forcillo — All Rights Reserved.',
    );
  });
});
