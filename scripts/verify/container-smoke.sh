#!/usr/bin/env sh
# curl-level contract test for the built container.
# Usage: sh scripts/verify/container-smoke.sh [image] [port]
set -eu

# Never hardcode `docker`: this machine has Podman only. The shim honours
# CONTAINER_ENGINE, prefers docker, falls back to podman.
ENGINE="$(node scripts/container-engine.mjs)"
IMAGE="${1:-bernardoforcillo-com:smoke}"
PORT="${2:-8080}"
BASE="http://127.0.0.1:${PORT}"
NAME="www-smoke"
NAME_NOENV="www-smoke-noenv"
PORT_NOENV=$((PORT + 1))
BASE_NOENV="http://127.0.0.1:${PORT_NOENV}"

fail() {
  echo "FAIL: $1"
  exit 1
}

cleanup() {
  "$ENGINE" rm -f "$NAME" "$NAME_NOENV" >/dev/null 2>&1 || true
}
trap cleanup EXIT
cleanup

echo "--- engine: $ENGINE"

echo '--- image metadata'
USER_SPEC=$("$ENGINE" image inspect --format '{{.Config.User}}' "$IMAGE")
[ "$USER_SPEC" = "65532:65532" ] || fail "container user is '$USER_SPEC', expected 65532:65532"
SIZE=$("$ENGINE" image inspect --format '{{.Size}}' "$IMAGE")
[ "$SIZE" -lt 41943040 ] || fail "image is ${SIZE} bytes, expected under 40 MiB"
echo "user=$USER_SPEC size=$SIZE"

echo '--- start containers'
"$ENGINE" run -d --rm --name "$NAME" -p "${PORT}:3000" \
  -e GTM_ID=GTM-TCMCZB6B "$IMAGE" >/dev/null
"$ENGINE" run -d --rm --name "$NAME_NOENV" -p "${PORT_NOENV}:3000" \
  "$IMAGE" >/dev/null

i=0
until curl -fsS "${BASE}/healthz" >/dev/null 2>&1; do
  i=$((i + 1))
  [ "$i" -lt 60 ] || fail "container never became healthy on ${BASE}/healthz"
  sleep 1
done

status() {
  curl -s -o /dev/null -w '%{http_code}' "$1"
}

echo '--- status codes'
[ "$(status "${BASE}/")" = '200' ] || fail 'GET / expected 200'
[ "$(status "${BASE}/blog")" = '200' ] || fail 'GET /blog expected 200'
[ "$(status "${BASE}/wp-admin")" = '200' ] || fail 'GET /wp-admin expected 200'
[ "$(status "${BASE}/definitely-not-a-page")" = '404' ] \
  || fail 'GET /definitely-not-a-page expected 404'
[ "$(status "${BASE}/healthz")" = '200' ] || fail 'GET /healthz expected 200'

echo '--- healthz body'
[ "$(curl -s "${BASE}/healthz")" = 'ok' ] || fail '/healthz body must be exactly ok'
curl -sI "${BASE}/healthz" | grep -iq 'content-type: *text/plain' \
  || fail '/healthz must be text/plain'

echo '--- config.js'
CONFIG=$(curl -s "${BASE}/config.js" | tr -d '\r\n')
EXPECTED='globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});'
[ "$CONFIG" = "$EXPECTED" ] || fail "/config.js body was: $CONFIG"
curl -sI "${BASE}/config.js" | grep -iq 'content-type: *application/javascript' \
  || fail '/config.js must be application/javascript'
curl -sI "${BASE}/config.js" | grep -iq 'cache-control: *no-store' \
  || fail '/config.js must be no-store'
CONFIG_NOENV=$(curl -s "${BASE_NOENV}/config.js" | tr -d '\r\n')
[ "$CONFIG_NOENV" = 'globalThis.__APP_CONFIG__=Object.freeze({});' ] \
  || fail "/config.js without GTM_ID was: $CONFIG_NOENV"

echo '--- cache headers'
# grep -a: the prerendered HTML carries TanStack Router's dehydration payload,
# whose route ids are NUL-separated. Without -a, GNU grep calls the page binary
# and prints "Binary file (standard input) matches" instead of the asset path.
ASSET=$(curl -s "${BASE}/" | grep -ao '/assets/[A-Za-z0-9._-]*\.js' | head -n 1)
[ -n "$ASSET" ] || fail 'no hashed /assets/*.js reference found in the home page'
curl -sI "${BASE}${ASSET}" \
  | grep -iq 'cache-control: *public, max-age=31536000, immutable' \
  || fail "hashed asset ${ASSET} is missing the immutable cache header"
curl -sI "${BASE}/" \
  | grep -iq 'cache-control: *public, max-age=0, must-revalidate' \
  || fail 'HTML is missing the revalidate cache header'

echo '--- 404 body'
curl -s "${BASE}/definitely-not-a-page" | grep -aq '404' \
  || fail 'the 404 response must serve the prerendered 404 page body'

echo 'PASS: container smoke'
