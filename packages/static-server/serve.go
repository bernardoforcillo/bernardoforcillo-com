package staticserver

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/buildwithgo/amaro"
)

// serveAsset resolves the request path against the prepared index. A miss
// returns an HTTPError so that the single error handler owns every 404, whether
// it came from here or from the router.
func serveAsset(index map[string]*asset) amaro.Handler {
	return func(c *amaro.Context) error {
		found, ok := lookup(index, c.Request.URL.Path)
		if !ok {
			return amaro.NewHTTPError(http.StatusNotFound, "not found")
		}
		return writeAsset(c, found)
	}
}

// writeAsset answers a conditional request from the startup hash, or writes the
// body. amaro's Context has no Blob helper, so the body goes straight to the
// ResponseWriter.
func writeAsset(c *amaro.Context, a *asset) error {
	header := c.Writer.Header()
	header.Set("ETag", a.etag)
	header.Set("Cache-Control", a.cacheControl)

	if etagMatches(c.Request.Header.Get("If-None-Match"), a.etag) {
		// Content-Type and Content-Length are deliberately never set on this
		// path: a 304 carries validators and caching directives, not a
		// representation.
		c.Writer.WriteHeader(http.StatusNotModified)
		return nil
	}

	header.Set("Content-Type", a.contentType)
	header.Set("Content-Length", strconv.Itoa(len(a.body)))

	c.Writer.WriteHeader(http.StatusOK)
	if c.Request.Method == http.MethodHead {
		return nil
	}

	_, err := c.Writer.Write(a.body)
	return err
}

// etagMatches reports whether an If-None-Match header selects the given entity
// tag. RFC 9110 requires the weak comparison function here, so the W/ prefix is
// ignored on both sides.
func etagMatches(ifNoneMatch, etag string) bool {
	if ifNoneMatch == "" || etag == "" {
		return false
	}

	want := strings.TrimPrefix(etag, "W/")
	for _, candidate := range strings.Split(ifNoneMatch, ",") {
		candidate = strings.TrimSpace(candidate)
		if candidate == "*" {
			return true
		}
		if strings.TrimPrefix(candidate, "W/") == want {
			return true
		}
	}

	return false
}
