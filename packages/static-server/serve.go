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

// writeAsset picks the representation the client can accept, answers a
// conditional request from the startup hash, or writes the body. Nothing is
// compressed or hashed here: under a 50m CPU limit the work is done once, at
// startup, by buildIndex.
func writeAsset(c *amaro.Context, a *asset) error {
	body, etag := a.body, a.etag
	useGzip := a.gzipBody != nil && acceptsGzip(c.Request.Header.Get("Accept-Encoding"))
	if useGzip {
		body, etag = a.gzipBody, a.gzipETag
	}

	header := c.Writer.Header()
	// Vary is set even when the response is not compressed: a shared cache must
	// not hand this identity response to a client that would have got gzip.
	header.Set("Vary", "Accept-Encoding")
	header.Set("ETag", etag)
	header.Set("Cache-Control", a.cacheControl)

	if etagMatches(c.Request.Header.Get("If-None-Match"), etag) {
		// Content-Type, Content-Length and Content-Encoding are deliberately
		// never set on this path: a 304 carries validators and caching
		// directives, not a representation.
		c.Writer.WriteHeader(http.StatusNotModified)
		return nil
	}

	if useGzip {
		header.Set("Content-Encoding", "gzip")
	}
	header.Set("Content-Type", a.contentType)
	header.Set("Content-Length", strconv.Itoa(len(body)))

	c.Writer.WriteHeader(http.StatusOK)
	if c.Request.Method == http.MethodHead {
		return nil
	}

	_, err := c.Writer.Write(body)
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

// acceptsGzip reports whether Accept-Encoding allows gzip. An explicit
// "gzip;q=0" is a refusal and is honoured; other quality values are not ranked,
// because gzip is the only encoding this server has.
func acceptsGzip(acceptEncoding string) bool {
	for _, part := range strings.Split(acceptEncoding, ",") {
		coding, parameters, _ := strings.Cut(strings.TrimSpace(part), ";")
		if !strings.EqualFold(strings.TrimSpace(coding), "gzip") {
			continue
		}
		if strings.EqualFold(strings.TrimSpace(parameters), "q=0") {
			return false
		}
		return true
	}
	return false
}
