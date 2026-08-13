package staticserver

import (
	"path"
	"strings"
)

// lookup resolves an incoming URL path against the prepared index, trying $uri,
// then $uri/index.html, then $uri.html - the three shapes a prerender-only
// TanStack Start build produces. A miss is a real miss: there is no SPA
// fallback, because answering an unknown path with the home page and a 200
// would poison indexing.
//
// Cleaning the path against a leading slash first makes traversal impossible:
// path.Clean("/../../etc/passwd") is "/etc/passwd", which simply is not in the
// index.
func lookup(index map[string]*asset, urlPath string) (*asset, bool) {
	name := strings.TrimPrefix(path.Clean("/"+urlPath), "/")

	if name != "" {
		if found, ok := index[name]; ok {
			return found, true
		}
	}
	if found, ok := index[path.Join(name, "index.html")]; ok {
		return found, true
	}
	if name != "" {
		if found, ok := index[name+".html"]; ok {
			return found, true
		}
	}

	return nil, false
}
