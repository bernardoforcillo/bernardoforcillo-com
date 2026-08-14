package staticserver

import "testing"

func TestLookup(t *testing.T) {
	index, err := buildIndex(testSite(), "/assets/")
	if err != nil {
		t.Fatalf("buildIndex returned %v", err)
	}

	tests := []struct {
		name     string
		urlPath  string
		wantFile string
		wantOK   bool
	}{
		{"root serves the home page", "/", "index.html", true},
		{"exact file", "/assets/logo.png", "assets/logo.png", true},
		{"exact page", "/about/index.html", "about/index.html", true},
		{"directory serves its index", "/about", "about/index.html", true},
		{"directory with a trailing slash", "/about/", "about/index.html", true},
		{"uri.html fallback", "/wp-admin", "wp-admin.html", true},
		{"dot segments are cleaned", "/assets/../about/", "about/index.html", true},
		{"traversal cannot escape the root", "/../../etc/passwd", "", false},
		{"unknown path", "/nope", "", false},
		{"unknown nested path", "/blog/missing/", "", false},
		{"empty path", "", "index.html", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, ok := lookup(index, tt.urlPath)
			if ok != tt.wantOK {
				t.Fatalf("lookup(%q) resolved = %v, want %v", tt.urlPath, ok, tt.wantOK)
			}
			if !tt.wantOK {
				return
			}
			if got != index[tt.wantFile] {
				t.Fatalf("lookup(%q) did not resolve to %q", tt.urlPath, tt.wantFile)
			}
		})
	}
}
