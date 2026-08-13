package staticserver

import (
	"net/http"
	"strconv"

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

// writeAsset writes one prepared asset. amaro's Context has no Blob helper, so
// the body goes straight to the ResponseWriter.
func writeAsset(c *amaro.Context, a *asset) error {
	header := c.Writer.Header()
	header.Set("Content-Type", a.contentType)
	header.Set("Cache-Control", a.cacheControl)
	header.Set("Content-Length", strconv.Itoa(len(a.body)))

	c.Writer.WriteHeader(http.StatusOK)
	if c.Request.Method == http.MethodHead {
		return nil
	}

	_, err := c.Writer.Write(a.body)
	return err
}
