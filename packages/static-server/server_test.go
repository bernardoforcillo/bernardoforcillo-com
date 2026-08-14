package staticserver

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"testing/fstest"

	"github.com/buildwithgo/amaro"
)

// newTestApp builds the server over the shared fixture with default options.
// Every test file in this package uses it.
func newTestApp(t *testing.T) *amaro.App {
	t.Helper()
	return New(testSite(), Options{})
}

// get performs a GET through amaro's own test entry point. header may be nil.
func get(t *testing.T, app *amaro.App, target string, header http.Header) *httptest.ResponseRecorder {
	t.Helper()
	request := httptest.NewRequest(http.MethodGet, target, nil)
	for name, values := range header {
		for _, value := range values {
			request.Header.Add(name, value)
		}
	}
	return app.Test(request)
}

func TestServeStaticFiles(t *testing.T) {
	app := newTestApp(t)
	site := testSite()

	tests := []struct {
		name             string
		target           string
		wantStatus       int
		wantBodyFile     string
		wantContentType  string
		wantCacheControl string
	}{
		{
			name:             "root serves the home page",
			target:           "/",
			wantStatus:       http.StatusOK,
			wantBodyFile:     "index.html",
			wantContentType:  "text/html; charset=utf-8",
			wantCacheControl: revalidateCacheControl,
		},
		{
			name:             "directory serves its index",
			target:           "/about",
			wantStatus:       http.StatusOK,
			wantBodyFile:     "about/index.html",
			wantContentType:  "text/html; charset=utf-8",
			wantCacheControl: revalidateCacheControl,
		},
		{
			name:             "uri.html fallback",
			target:           "/wp-admin",
			wantStatus:       http.StatusOK,
			wantBodyFile:     "wp-admin.html",
			wantContentType:  "text/html; charset=utf-8",
			wantCacheControl: revalidateCacheControl,
		},
		{
			name:             "hashed asset is immutable",
			target:           "/assets/logo.png",
			wantStatus:       http.StatusOK,
			wantBodyFile:     "assets/logo.png",
			wantContentType:  "image/png",
			wantCacheControl: immutableCacheControl,
		},
		{
			name:             "unknown path serves the prerendered 404",
			target:           "/does-not-exist",
			wantStatus:       http.StatusNotFound,
			wantBodyFile:     "404/index.html",
			wantContentType:  "text/html; charset=utf-8",
			wantCacheControl: revalidateCacheControl,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			response := get(t, app, tt.target, nil)

			if response.Code != tt.wantStatus {
				t.Fatalf("status = %d, want %d", response.Code, tt.wantStatus)
			}
			if got := response.Header().Get("Content-Type"); got != tt.wantContentType {
				t.Errorf("Content-Type = %q, want %q", got, tt.wantContentType)
			}
			if got := response.Header().Get("Cache-Control"); got != tt.wantCacheControl {
				t.Errorf("Cache-Control = %q, want %q", got, tt.wantCacheControl)
			}
			want := string(site[tt.wantBodyFile].Data)
			if response.Body.String() != want {
				t.Errorf("body = %q, want the contents of %s", response.Body.String(), tt.wantBodyFile)
			}
		})
	}
}

func TestHeadReturnsHeadersWithoutBody(t *testing.T) {
	app := newTestApp(t)

	request := httptest.NewRequest(http.MethodHead, "/", nil)
	response := app.Test(request)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	if got := response.Header().Get("Content-Type"); got != "text/html; charset=utf-8" {
		t.Errorf("Content-Type = %q, want text/html; charset=utf-8", got)
	}
	if response.Body.Len() != 0 {
		t.Errorf("body has %d bytes, want none", response.Body.Len())
	}
}

func TestUnknownPathDoesNotLeakInternalDetail(t *testing.T) {
	app := New(siteWithout404(), Options{})

	response := get(t, app, "/does-not-exist", nil)

	if response.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusNotFound)
	}
	if body := response.Body.String(); body != "Not Found\n" {
		t.Fatalf("body = %q, want the generic %q when no 404 page was built", body, "Not Found\n")
	}
}

// siteWithout404 is the fixture with its 404 page removed, which is how the
// server behaves if the prerender step ever stops emitting one.
func siteWithout404() fstest.MapFS {
	site := testSite()
	delete(site, "404/index.html")
	return site
}
