import { describe, expect, it } from 'vitest';
import {
  CONSENT_COOKIE,
  CONSENT_VERSION,
  parseConsent,
  serializeConsent,
  toConsentMode,
} from './consent';

const cookie = (value: string) =>
  `theme=dark; ${CONSENT_COOKIE}=${value}; other=1`;

describe('consent cookie', () => {
  it('round-trips a choice', () => {
    const choice = {
      version: CONSENT_VERSION,
      analytics: true,
      date: '2026-11-23T10:00:00.000Z',
    };
    expect(parseConsent(cookie(serializeConsent(choice)))).toEqual(choice);
  });

  it('returns null without a consent cookie', () => {
    expect(parseConsent('theme=dark; other=1')).toBeNull();
    expect(parseConsent('')).toBeNull();
  });

  it('returns null for a choice made under an older version', () => {
    const old = serializeConsent({
      version: CONSENT_VERSION - 1,
      analytics: true,
      date: 'x',
    });
    expect(parseConsent(cookie(old))).toBeNull();
  });

  it('returns null for malformed values', () => {
    expect(parseConsent(cookie('not-json'))).toBeNull();
    expect(
      parseConsent(cookie(encodeURIComponent('{"v":1,"a":"yes","d":"x"}'))),
    ).toBeNull();
  });
});

describe('consent mode', () => {
  it('grants only analytics and never advertising', () => {
    expect(toConsentMode(true)).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    expect(toConsentMode(false).analytics_storage).toBe('denied');
  });
});
