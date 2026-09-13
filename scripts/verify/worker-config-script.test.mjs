import assert from 'node:assert/strict';
import { test } from 'node:test';

import { renderConfigScript } from '../../apps/www/worker/config-script.js';

// The Worker's /config.js has to keep producing byte-for-byte what
// packages/static-server/config.go produced: apps/www/src/lib/gtm.ts reads the
// global it defines and tests/e2e/smoke.spec.ts asserts the exact string.
// The cases below are transcribed from packages/static-server/config_test.go.

// Written as a character code so that no layer between here and disk can turn
// a literal backslash into the character it escapes - which is precisely the
// bug these tests exist to catch.
const BACKSLASH = String.fromCharCode(92);

test('the config script matches the Go server byte for byte', () => {
  assert.equal(
    renderConfigScript({ GTM_ID: 'GTM-TCMCZB6B' }, ['GTM_ID']),
    'globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});',
  );
  assert.equal(
    renderConfigScript(
      { GTM_ID: 'GTM-TCMCZB6B', API_HOST: 'https://api.example.com' },
      ['GTM_ID', 'API_HOST'],
    ),
    'globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B","API_HOST":"https://api.example.com"});',
  );
});

test('a variable that is not set is omitted rather than emitted as empty', () => {
  assert.equal(
    renderConfigScript({ GTM_ID: 'GTM-TCMCZB6B' }, ['GTM_ID', 'API_HOST']),
    'globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});',
  );
  assert.equal(
    renderConfigScript({}, ['GTM_ID']),
    'globalThis.__APP_CONFIG__=Object.freeze({});',
  );
  assert.equal(
    renderConfigScript({}, []),
    'globalThis.__APP_CONFIG__=Object.freeze({});',
  );
});

test('the allowlist is what ships, not the whole environment', () => {
  assert.equal(
    renderConfigScript({ GTM_ID: 'GTM-1', SECRET: 'nope' }, ['GTM_ID']),
    'globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-1"});',
  );
});

test('a value can never close the script element', () => {
  const u = `${BACKSLASH}u`;
  const want = `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"${u}003c/script${u}003e${u}003cscript${u}003ealert(${BACKSLASH}"x${BACKSLASH}")"});`;

  assert.equal(
    renderConfigScript({ GTM_ID: '</script><script>alert("x")' }, ['GTM_ID']),
    want,
  );
});
