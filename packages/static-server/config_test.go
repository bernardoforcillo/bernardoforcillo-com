package staticserver

import (
	"net/http"
	"os"
	"testing"
)

func TestRenderConfigScript(t *testing.T) {
	tests := []struct {
		name  string
		env   map[string]string
		unset []string
		names []string
		want  string
	}{
		{
			name:  "one variable",
			env:   map[string]string{"GTM_ID": "GTM-TCMCZB6B"},
			names: []string{"GTM_ID"},
			want:  `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});`,
		},
		{
			name:  "several variables keep the declared order",
			env:   map[string]string{"GTM_ID": "GTM-TCMCZB6B", "API_HOST": "https://api.example.com"},
			names: []string{"GTM_ID", "API_HOST"},
			want:  `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B","API_HOST":"https://api.example.com"});`,
		},
		{
			name:  "an unset variable is omitted entirely",
			env:   map[string]string{"GTM_ID": "GTM-TCMCZB6B"},
			unset: []string{"API_HOST"},
			names: []string{"GTM_ID", "API_HOST"},
			want:  `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});`,
		},
		{
			name:  "an empty allowlist yields an empty object",
			names: nil,
			want:  `globalThis.__APP_CONFIG__=Object.freeze({});`,
		},
		{
			name:  "every variable unset yields an empty object",
			unset: []string{"GTM_ID"},
			names: []string{"GTM_ID"},
			want:  `globalThis.__APP_CONFIG__=Object.freeze({});`,
		},
		{
			name:  "values are escaped, not interpolated",
			env:   map[string]string{"GTM_ID": `</script><script>alert("x")`},
			names: []string{"GTM_ID"},
			want:  `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"\u003c/script\u003e\u003cscript\u003ealert(\"x\")"});`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			for name, value := range tt.env {
				t.Setenv(name, value)
			}
			for _, name := range tt.unset {
				t.Setenv(name, "placeholder")
				if err := os.Unsetenv(name); err != nil {
					t.Fatalf("unsetting %s returned %v", name, err)
				}
			}

			if got := renderConfigScript(tt.names); got != tt.want {
				t.Fatalf("renderConfigScript(%v) =\n%s\nwant\n%s", tt.names, got, tt.want)
			}
		})
	}
}

func TestConfigJS(t *testing.T) {
	t.Setenv("GTM_ID", "GTM-TCMCZB6B")

	app := New(testSite(), Options{ConfigEnv: []string{"GTM_ID"}})
	response := get(t, app, "/config.js", nil)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	want := `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-TCMCZB6B"});`
	if got := response.Body.String(); got != want {
		t.Errorf("body = %q, want %q", got, want)
	}
	if got := response.Header().Get("Content-Type"); got != "application/javascript" {
		t.Errorf("Content-Type = %q, want application/javascript", got)
	}
	if got := response.Header().Get("Cache-Control"); got != noStoreCacheControl {
		t.Errorf("Cache-Control = %q, want %q", got, noStoreCacheControl)
	}
}

func TestConfigJSWithoutAllowlist(t *testing.T) {
	app := New(testSite(), Options{})
	response := get(t, app, "/config.js", nil)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	want := `globalThis.__APP_CONFIG__=Object.freeze({});`
	if got := response.Body.String(); got != want {
		t.Fatalf("body = %q, want %q", got, want)
	}
}

func TestConfigJSIsReadAtStartup(t *testing.T) {
	t.Setenv("GTM_ID", "GTM-FIRST")
	app := New(testSite(), Options{ConfigEnv: []string{"GTM_ID"}})

	t.Setenv("GTM_ID", "GTM-SECOND")

	want := `globalThis.__APP_CONFIG__=Object.freeze({"GTM_ID":"GTM-FIRST"});`
	if got := get(t, app, "/config.js", nil).Body.String(); got != want {
		t.Fatalf("body = %q, want %q: the environment is read once, at startup", got, want)
	}
}
