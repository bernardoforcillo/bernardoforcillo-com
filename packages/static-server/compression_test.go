package staticserver

import (
	"bytes"
	"compress/gzip"
	"io"
	"net/http"
	"testing"
)

func TestCompressionNegotiation(t *testing.T) {
	app := newTestApp(t)
	site := testSite()

	tests := []struct {
		name           string
		target         string
		acceptEncoding string
		wantEncoding   string
		bodyFile       string
	}{
		{"gzip when asked", "/", "gzip", "gzip", "index.html"},
		{"gzip inside a list", "/", "br, gzip, deflate", "gzip", "index.html"},
		{"identity when not asked", "/", "", "", "index.html"},
		{"identity when only br is offered", "/", "br", "", "index.html"},
		{"identity when gzip is refused", "/", "gzip;q=0", "", "index.html"},
		{"small page is never precompressed", "/about", "gzip", "", "about/index.html"},
		{"png is never precompressed", "/assets/logo.png", "gzip", "", "assets/logo.png"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			header := http.Header{}
			if tt.acceptEncoding != "" {
				header.Set("Accept-Encoding", tt.acceptEncoding)
			}

			response := get(t, app, tt.target, header)

			if response.Code != http.StatusOK {
				t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
			}
			if got := response.Header().Get("Vary"); got != "Accept-Encoding" {
				t.Errorf("Vary = %q, want Accept-Encoding on every response", got)
			}
			if got := response.Header().Get("Content-Encoding"); got != tt.wantEncoding {
				t.Fatalf("Content-Encoding = %q, want %q", got, tt.wantEncoding)
			}

			want := site[tt.bodyFile].Data
			body := response.Body.Bytes()
			if tt.wantEncoding == "gzip" {
				if bytes.Equal(body, want) {
					t.Fatal("body was announced as gzip but is the identity representation")
				}
				reader, err := gzip.NewReader(bytes.NewReader(body))
				if err != nil {
					t.Fatalf("gzip.NewReader returned %v", err)
				}
				defer reader.Close()
				decoded, err := io.ReadAll(reader)
				if err != nil {
					t.Fatalf("reading the body returned %v", err)
				}
				body = decoded
			}
			if !bytes.Equal(body, want) {
				t.Fatalf("body does not match %s", tt.bodyFile)
			}
		})
	}
}

func TestGzipRepresentationHasItsOwnETag(t *testing.T) {
	app := newTestApp(t)

	identity := get(t, app, "/", nil)
	compressed := get(t, app, "/", http.Header{"Accept-Encoding": {"gzip"}})

	identityETag := identity.Header().Get("ETag")
	gzipETag := compressed.Header().Get("ETag")

	if gzipETag == "" {
		t.Fatal("the gzip response carries no ETag")
	}
	if gzipETag == identityETag {
		t.Fatal("the gzip and identity representations share an ETag")
	}

	revalidated := get(t, app, "/", http.Header{
		"Accept-Encoding": {"gzip"},
		"If-None-Match":   {gzipETag},
	})
	if revalidated.Code != http.StatusNotModified {
		t.Fatalf("status = %d, want %d when revalidating the gzip representation", revalidated.Code, http.StatusNotModified)
	}
	if revalidated.Body.Len() != 0 {
		t.Errorf("304 body has %d bytes, want none", revalidated.Body.Len())
	}
}

func TestAcceptsGzip(t *testing.T) {
	tests := []struct {
		name   string
		header string
		want   bool
	}{
		{"plain", "gzip", true},
		{"in a list", "br, gzip", true},
		{"with a quality", "gzip;q=0.5", true},
		{"padded", " gzip , deflate ", true},
		{"uppercase", "GZIP", true},
		{"refused", "gzip;q=0", false},
		{"absent", "br, deflate", false},
		{"empty", "", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := acceptsGzip(tt.header); got != tt.want {
				t.Fatalf("acceptsGzip(%q) = %v, want %v", tt.header, got, tt.want)
			}
		})
	}
}
