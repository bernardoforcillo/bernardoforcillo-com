package staticserver

import (
	"bytes"
	"log"
	"net/http"
	"os"
	"strings"
	"testing"
)

func TestSecurityHeaders(t *testing.T) {
	app := newTestApp(t)

	targets := []string{"/", "/does-not-exist", "/healthz", "/assets/logo.png"}
	wanted := map[string]string{
		"X-Content-Type-Options": "nosniff",
		"Referrer-Policy":        "strict-origin-when-cross-origin",
		"X-Frame-Options":        "DENY",
	}

	for _, target := range targets {
		t.Run(target, func(t *testing.T) {
			response := get(t, app, target, nil)
			for name, want := range wanted {
				if got := response.Header().Get(name); got != want {
					t.Errorf("%s = %q, want %q", name, got, want)
				}
			}
		})
	}
}

func TestHealthz(t *testing.T) {
	app := newTestApp(t)

	response := get(t, app, "/healthz", nil)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	if got := response.Body.String(); got != "ok" {
		t.Errorf("body = %q, want %q", got, "ok")
	}
	if got := response.Header().Get("Content-Type"); got != "text/plain; charset=utf-8" {
		t.Errorf("Content-Type = %q, want text/plain; charset=utf-8", got)
	}
	if got := response.Header().Get("Cache-Control"); got != noStoreCacheControl {
		t.Errorf("Cache-Control = %q, want %q", got, noStoreCacheControl)
	}
}

func TestAccessLog(t *testing.T) {
	app := newTestApp(t)

	tests := []struct {
		name       string
		target     string
		wantLogged string
	}{
		{"page requests are logged", "/", "GET / 200"},
		{"missing pages are logged with their real status", "/does-not-exist", "GET /does-not-exist 404"},
		{"probes are not logged", "/healthz", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var captured bytes.Buffer
			flags := log.Flags()
			log.SetOutput(&captured)
			log.SetFlags(0)
			t.Cleanup(func() {
				log.SetOutput(os.Stderr)
				log.SetFlags(flags)
			})

			get(t, app, tt.target, nil)

			logged := captured.String()
			if tt.wantLogged == "" {
				if logged != "" {
					t.Fatalf("request to %s logged %q, want nothing", tt.target, logged)
				}
				return
			}
			if !strings.Contains(logged, tt.wantLogged) {
				t.Fatalf("log = %q, want it to contain %q", logged, tt.wantLogged)
			}
		})
	}
}
