/**
 * Cookie consent: what the visitor chose, where it is stored, and how it
 * reaches Google Tag Manager through Consent Mode v2.
 *
 * Google Tag Manager is loaded only after the visitor accepts analytics, so
 * nothing is requested from Google before consent. The consent defaults are
 * still pushed first, so every tag in the container sees a consent state.
 */

/** Bump when the categories or the cookie policy change in a way that needs a new choice. */
export const CONSENT_VERSION = 1;

export const CONSENT_COOKIE = 'cookie_consent';

/** Six months, after which the banner asks again. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182;

/** Dispatched on window to reopen the preferences from anywhere on the site. */
export const OPEN_PREFERENCES_EVENT = 'consent:open-preferences';

export type ConsentChoice = {
  version: number;
  analytics: boolean;
  /** ISO date of the choice, kept as proof of when consent was given. */
  date: string;
};

type ConsentState = 'granted' | 'denied';

export type ConsentModeUpdate = {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
};

/** Advertising stays denied: the site runs no advertising tags. */
export const toConsentMode = (analytics: boolean): ConsentModeUpdate => ({
  analytics_storage: analytics ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

export const serializeConsent = (choice: ConsentChoice): string =>
  encodeURIComponent(
    JSON.stringify({
      v: choice.version,
      a: choice.analytics ? 1 : 0,
      d: choice.date,
    }),
  );

/**
 * Reads the choice from a `document.cookie` string. Returns null when there is
 * no choice, when it cannot be parsed, or when it predates CONSENT_VERSION.
 */
export const parseConsent = (cookieHeader: string): ConsentChoice | null => {
  const entry = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;

  try {
    const raw = JSON.parse(
      decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)),
    );
    if (
      raw?.v !== CONSENT_VERSION ||
      (raw.a !== 0 && raw.a !== 1) ||
      typeof raw.d !== 'string'
    ) {
      return null;
    }
    return { version: raw.v, analytics: raw.a === 1, date: raw.d };
  } catch {
    return null;
  }
};

type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __APP_CONFIG__?: { GTM_ID?: string };
};

const GTM_SCRIPT_ID = 'gtm-script';

export const readConsent = (): ConsentChoice | null =>
  typeof document === 'undefined' ? null : parseConsent(document.cookie);

/** Loads the container once. No-op without a GTM_ID (dev and prerender). */
export const loadGtm = (): void => {
  const w = window as ConsentWindow;
  const id = w.__APP_CONFIG__?.GTM_ID;
  if (!id || document.getElementById(GTM_SCRIPT_ID)) return;

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
};

/** Removes the Google Analytics cookies (_ga, _ga_<container>) on every parent domain. */
const clearAnalyticsCookies = (): void => {
  const names = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const labels = window.location.hostname.split('.');
  const domains = labels.map((_, i) => labels.slice(i).join('.'));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${domain}`;
    }
  }
};

/** Stores the choice, updates Consent Mode, and loads or stops analytics. */
export const saveConsent = (analytics: boolean): ConsentChoice => {
  const choice: ConsentChoice = {
    version: CONSENT_VERSION,
    analytics,
    date: new Date().toISOString(),
  };
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(choice)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;

  const w = window as ConsentWindow;
  w.gtag?.('consent', 'update', toConsentMode(analytics));
  w.dataLayer?.push({ event: 'consent_update', analytics_consent: analytics });

  if (analytics) loadGtm();
  else clearAnalyticsCookies();

  return choice;
};

export const openConsentPreferences = (): void => {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
};
