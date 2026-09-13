/**
 * The body of /config.js, kept in its own module so that the Worker and
 * scripts/verify/worker-config-script.test.mjs render it through exactly the
 * same code. It is plain JavaScript rather than TypeScript so `node --test` can
 * import it without a build step.
 *
 * This is a port of packages/static-server/config.go and has to stay
 * byte-for-byte identical to it: apps/www/src/lib/gtm.ts reads the global it
 * defines and tests/e2e/smoke.spec.ts asserts the exact string.
 */

/**
 * Encodes a value as a JSON string literal with the three characters that could
 * break out of a script element escaped, which is what Go's encoding/json does
 * by default. JSON.stringify does not escape them, so it is done here.
 *
 * The replacement is derived from the character code rather than written as a
 * literal: spelled out, it is one missing backslash away from meaning the
 * character itself, which would silently turn this function into a no-op.
 *
 * @param {string} value
 * @returns {string}
 */
export function jsonString(value) {
  return JSON.stringify(value).replace(
    /[<>&]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`,
  );
}

/**
 * Renders the allowlisted variables into a frozen global. A variable that is
 * not set is omitted entirely rather than emitted as an empty string, so the
 * GTM bootstrap can tell "not configured" from "configured as nothing" and
 * no-op cleanly in development.
 *
 * @param {Record<string, string | undefined>} env
 * @param {readonly string[]} names allowlist; anything absent never ships
 * @returns {string}
 */
export function renderConfigScript(env, names) {
  const entries = [];

  for (const name of names) {
    const value = env[name];
    if (value === undefined) {
      continue;
    }
    entries.push(`${jsonString(name)}:${jsonString(value)}`);
  }

  return `globalThis.__APP_CONFIG__=Object.freeze({${entries.join(',')}});`;
}
