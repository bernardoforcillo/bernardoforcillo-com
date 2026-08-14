package staticserver

import (
	"net/http"
	"testing"
)

func TestETagIsServedAndStable(t *testing.T) {
	app := newTestApp(t)

	for _, target := range []string{"/", "/about", "/assets/logo.png"} {
		t.Run(target, func(t *testing.T) {
			first := get(t, app, target, nil)
			etag := first.Header().Get("ETag")

			if etag == "" {
				t.Fatal("no ETag on the response")
			}
			if etag[0] != '"' || etag[len(etag)-1] != '"' {
				t.Fatalf("ETag %q is not a quoted entity tag", etag)
			}
			if second := get(t, app, target, nil).Header().Get("ETag"); second != etag {
				t.Fatalf("ETag changed between requests: %q then %q", etag, second)
			}
		})
	}
}

func TestIfNoneMatch(t *testing.T) {
	app := newTestApp(t)
	etag := get(t, app, "/", nil).Header().Get("ETag")

	tests := []struct {
		name        string
		ifNoneMatch string
		wantStatus  int
	}{
		{"matching tag", etag, http.StatusNotModified},
		{"weak form of the same tag", "W/" + etag, http.StatusNotModified},
		{"tag in a list", `"other", ` + etag, http.StatusNotModified},
		{"wildcard", "*", http.StatusNotModified},
		{"stale tag", `"0000000000000000000000000000000000"`, http.StatusOK},
		{"no header", "", http.StatusOK},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			header := http.Header{}
			if tt.ifNoneMatch != "" {
				header.Set("If-None-Match", tt.ifNoneMatch)
			}

			response := get(t, app, "/", header)

			if response.Code != tt.wantStatus {
				t.Fatalf("status = %d, want %d", response.Code, tt.wantStatus)
			}
			if tt.wantStatus != http.StatusNotModified {
				return
			}
			if response.Body.Len() != 0 {
				t.Errorf("304 body has %d bytes, want none", response.Body.Len())
			}
			if got := response.Header().Get("ETag"); got != etag {
				t.Errorf("304 ETag = %q, want %q", got, etag)
			}
			if got := response.Header().Get("Cache-Control"); got != revalidateCacheControl {
				t.Errorf("304 Cache-Control = %q, want %q", got, revalidateCacheControl)
			}
			if got := response.Header().Get("Content-Type"); got != "" {
				t.Errorf("304 carries Content-Type %q, want none", got)
			}
			if got := response.Header().Get("Content-Length"); got != "" {
				t.Errorf("304 carries Content-Length %q, want none", got)
			}
		})
	}
}

func TestETagMatches(t *testing.T) {
	tests := []struct {
		name        string
		ifNoneMatch string
		etag        string
		want        bool
	}{
		{"exact", `"abc"`, `"abc"`, true},
		{"weak request tag", `W/"abc"`, `"abc"`, true},
		{"weak stored tag", `"abc"`, `W/"abc"`, true},
		{"list with spaces", `"x" , W/"abc"`, `"abc"`, true},
		{"wildcard", "*", `"abc"`, true},
		{"different tag", `"xyz"`, `"abc"`, false},
		{"empty header", "", `"abc"`, false},
		{"empty tag", `"abc"`, "", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := etagMatches(tt.ifNoneMatch, tt.etag); got != tt.want {
				t.Fatalf("etagMatches(%q, %q) = %v, want %v", tt.ifNoneMatch, tt.etag, got, tt.want)
			}
		})
	}
}
