package staticserver

import (
	"mime"
	"path"
	"strings"
)

// contentTypes maps a lowercase file extension to the Content-Type served for
// it. The table is explicit because mime.TypeByExtension consults the operating
// system (the Windows registry, /etc/mime.types, /etc/apache2/mime.types), so
// the same binary would otherwise label the same file differently on a
// developer machine and in the distroless container.
var contentTypes = map[string]string{
	".avif":        "image/avif",
	".css":         "text/css; charset=utf-8",
	".gif":         "image/gif",
	".html":        "text/html; charset=utf-8",
	".ico":         "image/x-icon",
	".jpeg":        "image/jpeg",
	".jpg":         "image/jpeg",
	".js":          "text/javascript; charset=utf-8",
	".json":        "application/json; charset=utf-8",
	".map":         "application/json; charset=utf-8",
	".mjs":         "text/javascript; charset=utf-8",
	".png":         "image/png",
	".svg":         "image/svg+xml",
	".txt":         "text/plain; charset=utf-8",
	".wasm":        "application/wasm",
	".webmanifest": "application/manifest+json",
	".webp":        "image/webp",
	".woff":        "font/woff",
	".woff2":       "font/woff2",
	".xml":         "application/xml",
}

// contentTypeFor returns the Content-Type for a file inside the prerendered
// build, falling back to the platform table and finally to a type that keeps
// X-Content-Type-Options: nosniff meaningful.
func contentTypeFor(name string) string {
	ext := strings.ToLower(path.Ext(name))
	if contentType, ok := contentTypes[ext]; ok {
		return contentType
	}
	if contentType := mime.TypeByExtension(ext); contentType != "" {
		return contentType
	}
	return "application/octet-stream"
}

// isCompressible reports whether gzipping a body of this type is worth the
// startup cost. Already-compressed formats (png, webp, woff2) are excluded:
// gzipping them spends CPU to make the payload larger.
func isCompressible(contentType string) bool {
	base := contentType
	if i := strings.IndexByte(base, ';'); i >= 0 {
		base = base[:i]
	}
	base = strings.TrimSpace(base)

	if strings.HasPrefix(base, "text/") {
		return true
	}
	switch base {
	case "application/json", "application/xml", "application/wasm",
		"application/manifest+json", "image/svg+xml":
		return true
	}
	return false
}
