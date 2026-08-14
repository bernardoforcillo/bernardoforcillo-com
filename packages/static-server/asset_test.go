package staticserver

import (
	"bytes"
	"compress/gzip"
	"io"
	"strings"
	"testing"
	"testing/fstest"
)

// testSite is the in-memory stand-in for a prerendered TanStack build: a home
// page, a nested page, a page that only exists as $uri.html, the 404 page, one
// hashed asset large enough to be worth compressing and one that is not.
// Every test file in this package builds on it.
func testSite() fstest.MapFS {
	return fstest.MapFS{
		"index.html": &fstest.MapFile{
			Data: []byte("<!doctype html><title>home</title>" + strings.Repeat("<p>hello</p>", 200)),
		},
		"about/index.html": &fstest.MapFile{
			Data: []byte("<!doctype html><title>about</title>"),
		},
		"wp-admin.html": &fstest.MapFile{
			Data: []byte("<!doctype html><title>wp-admin</title>"),
		},
		"404/index.html": &fstest.MapFile{
			Data: []byte("<!doctype html><title>404</title><h1>Page not found</h1>"),
		},
		"assets/app-d34db33f.js": &fstest.MapFile{
			Data: []byte("console.log('hi');" + strings.Repeat("//padding\n", 200)),
		},
		"assets/logo.png": &fstest.MapFile{
			Data: []byte{0x89, 'P', 'N', 'G', 0x0d, 0x0a, 0x1a, 0x0a},
		},
		"robots.txt": &fstest.MapFile{
			Data: []byte("User-agent: *\nAllow: /\n"),
		},
	}
}

func TestBuildIndex(t *testing.T) {
	index, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}

	tests := []struct {
		name             string
		file             string
		wantContentType  string
		wantCacheControl string
		wantGzip         bool
	}{
		{"home page revalidates and compresses", "index.html", "text/html; charset=utf-8", revalidateCacheControl, true},
		{"small page is not worth compressing", "about/index.html", "text/html; charset=utf-8", revalidateCacheControl, false},
		{"hashed script is immutable", "assets/app-d34db33f.js", "text/javascript; charset=utf-8", immutableCacheControl, true},
		{"binary asset is immutable and raw", "assets/logo.png", "image/png", immutableCacheControl, false},
		{"root text file revalidates", "robots.txt", "text/plain; charset=utf-8", revalidateCacheControl, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a, ok := index[tt.file]
			if !ok {
				t.Fatalf("index is missing %q", tt.file)
			}
			if a.contentType != tt.wantContentType {
				t.Errorf("contentType = %q, want %q", a.contentType, tt.wantContentType)
			}
			if a.cacheControl != tt.wantCacheControl {
				t.Errorf("cacheControl = %q, want %q", a.cacheControl, tt.wantCacheControl)
			}
			if got := a.gzipBody != nil; got != tt.wantGzip {
				t.Errorf("precompressed = %v, want %v", got, tt.wantGzip)
			}
			if tt.wantGzip {
				if len(a.gzipBody) >= len(a.body) {
					t.Errorf("gzip body is %d bytes, not smaller than the %d byte original", len(a.gzipBody), len(a.body))
				}
				if a.gzipETag == "" {
					t.Error("gzipETag is empty for a precompressed asset")
				}
				if a.gzipETag == a.etag {
					t.Error("gzipETag must differ from the identity etag: they are different representations")
				}
			} else if a.gzipETag != "" {
				t.Errorf("gzipETag = %q, want empty for an asset that is not precompressed", a.gzipETag)
			}
		})
	}
}

func TestBuildIndexSkipsDirectories(t *testing.T) {
	index, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}
	for _, name := range []string{".", "about", "assets", "404"} {
		if _, ok := index[name]; ok {
			t.Errorf("index contains directory entry %q", name)
		}
	}
	if len(index) != 7 {
		t.Fatalf("index holds %d entries, want 7", len(index))
	}
}

func TestETagIsQuotedAndStable(t *testing.T) {
	first, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}
	second, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}

	etag := first["index.html"].etag
	if !strings.HasPrefix(etag, `"`) || !strings.HasSuffix(etag, `"`) {
		t.Fatalf("etag %q is not a quoted entity tag", etag)
	}
	if len(etag) != 34 {
		t.Fatalf("etag %q has length %d, want 34 (32 hex characters plus two quotes)", etag, len(etag))
	}
	if second["index.html"].etag != etag {
		t.Fatalf("etag changed between builds: %q then %q", etag, second["index.html"].etag)
	}
	if first["about/index.html"].etag == etag {
		t.Fatal("two different files produced the same etag")
	}
}

func TestGzipBodyRoundTrips(t *testing.T) {
	index, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}
	a := index["index.html"]

	reader, err := gzip.NewReader(bytes.NewReader(a.gzipBody))
	if err != nil {
		t.Fatalf("gzip.NewReader returned %v", err)
	}
	defer reader.Close()

	decoded, err := io.ReadAll(reader)
	if err != nil {
		t.Fatalf("reading the gzip body returned %v", err)
	}
	if !bytes.Equal(decoded, a.body) {
		t.Fatal("the gzip body does not decode back to the original bytes")
	}
}

func TestCacheControlFor(t *testing.T) {
	tests := []struct {
		name        string
		file        string
		assetPrefix string
		want        string
	}{
		{"hashed asset", "assets/app-d34db33f.js", "/assets/", immutableCacheControl},
		{"page", "about/index.html", "/assets/", revalidateCacheControl},
		{"file whose name merely starts like the prefix", "assets-notes.html", "/assets/", revalidateCacheControl},
		{"custom prefix", "static/app.js", "/static/", immutableCacheControl},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := cacheControlFor(tt.file, tt.assetPrefix); got != tt.want {
				t.Fatalf("cacheControlFor(%q, %q) = %q, want %q", tt.file, tt.assetPrefix, got, tt.want)
			}
		})
	}
}
