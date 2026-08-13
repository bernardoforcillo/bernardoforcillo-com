#!/usr/bin/env sh
# Renders the kustomization offline and asserts the deployment contract.
# Usage: sh scripts/verify/k8s-check.sh
set -eu

RENDER=$(kubectl kustomize kubernetes)

fail() {
  echo "FAIL: $1"
  exit 1
}

has() {
  echo "$RENDER" | grep -qF "$1" || fail "missing from the render: $1"
}

hasnt() {
  echo "$RENDER" | grep -qF "$1" && fail "still present in the render: $1"
  return 0
}

# NOTE: these assertions run against the *rendered* YAML, not the source file.
# `kubectl kustomize` re-serialises the document and strips the single quotes
# around resource quantities - the render says `memory: 32Mi`, never
# `memory: '32Mi'`. Quoting them here would make them unsatisfiable, and would
# make the matching `hasnt` guards vacuous.
echo '--- changed values'
[ "$(echo "$RENDER" | grep -cF 'path: /healthz')" = '3' ] \
  || fail 'expected exactly three /healthz probe paths'
has 'runAsUser: 65532'
has 'runAsGroup: 65532'
has 'fsGroup: 65532'
has 'memory: 32Mi'
has 'cpu: 50m'
has 'memory: 16Mi'
has 'cpu: 10m'
hasnt 'runAsUser: 1001'
hasnt 'memory: 128Mi'
hasnt 'memory: 64Mi'
[ "$(echo "$RENDER" | grep -cE '^ +path: /$')" = '0' ] \
  || fail 'a probe still targets /'

echo '--- untouched values'
has 'containerPort: 3000'
has 'targetPort: 3000'
has 'name: GTM_ID'
has 'value: GTM-TCMCZB6B'
has 'readOnlyRootFilesystem: true'
has 'runAsNonRoot: true'
has 'type: RuntimeDefault'
has 'terminationGracePeriodSeconds: 30'
has 'kind: CiliumNetworkPolicy'
has 'kind: IngressRoute'
has 'mountPath: /tmp'

echo 'PASS: kubernetes manifests'
