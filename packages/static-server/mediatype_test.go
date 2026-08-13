package staticserver

import "testing"

func TestContentTypeFor(t *testing.T) {
	tests := []struct {
		name string
		file string
		want string
	}{
		{"html", "index.html", "text/html; charset=utf-8"},
		{"nested html", "about/index.html", "text/html; charset=utf-8"},
		{"javascript", "assets/app-d34db33f.js", "text/javascript; charset=utf-8"},
		{"module", "assets/app.mjs", "text/javascript; charset=utf-8"},
		{"css", "assets/app.css", "text/css; charset=utf-8"},
		{"svg", "logo.svg", "image/svg+xml"},
		{"png", "logo.png", "image/png"},
		{"woff2", "fonts/inter.woff2", "font/woff2"},
		{"xml", "sitemap.xml", "application/xml"},
		{"text", "robots.txt", "text/plain; charset=utf-8"},
		{"uppercase extension", "LOGO.PNG", "image/png"},
		{"unknown extension", "weird.qqq", "application/octet-stream"},
		{"type the os would resolve differently", "archive.zip", "application/octet-stream"},
		{"type the os would resolve at all", "paper.pdf", "application/octet-stream"},
		{"no extension", "LICENSE", "application/octet-stream"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := contentTypeFor(tt.file); got != tt.want {
				t.Fatalf("contentTypeFor(%q) = %q, want %q", tt.file, got, tt.want)
			}
		})
	}
}

func TestIsCompressible(t *testing.T) {
	tests := []struct {
		name        string
		contentType string
		want        bool
	}{
		{"html", "text/html; charset=utf-8", true},
		{"javascript", "text/javascript; charset=utf-8", true},
		{"json", "application/json; charset=utf-8", true},
		{"svg", "image/svg+xml", true},
		{"xml", "application/xml", true},
		{"wasm", "application/wasm", true},
		{"png", "image/png", false},
		{"woff2", "font/woff2", false},
		{"unknown", "application/octet-stream", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isCompressible(tt.contentType); got != tt.want {
				t.Fatalf("isCompressible(%q) = %v, want %v", tt.contentType, got, tt.want)
			}
		})
	}
}
