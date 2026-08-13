// Package staticserver serves a prerendered static site from any fs.FS - in
// production an embed.FS - with the validators, cache classes, error page and
// precomputed encodings that amaro's own StaticHandler does not provide.
package staticserver

import (
	"errors"
	"io/fs"
	"net/http"
	"strconv"

	"github.com/buildwithgo/amaro"
	"github.com/buildwithgo/amaro/routers"
)

const (
	defaultNotFoundPath = "404/index.html"
	defaultAssetPrefix  = "/assets/"
)

// Options configures the server. The zero value is valid and describes the
// layout that apps/www produces.
type Options struct {
	// NotFoundPath is the path, inside files, of the prerendered 404 page.
	// Default: "404/index.html".
	NotFoundPath string

	// AssetPrefix is the URL prefix under which content-hashed build output
	// lives and may therefore be cached forever. Default: "/assets/".
	AssetPrefix string

	// ConfigEnv lists the environment variable names exposed by /config.js.
	// Anything not listed here never reaches the browser.
	ConfigEnv []string
}

func (o Options) withDefaults() Options {
	if o.NotFoundPath == "" {
		o.NotFoundPath = defaultNotFoundPath
	}
	if o.AssetPrefix == "" {
		o.AssetPrefix = defaultAssetPrefix
	}
	return o
}

// New prepares every response the site can give and returns the application
// ready to run. It panics if files cannot be walked: a pod that cannot read the
// site baked into its own binary must fail at startup, not per request.
func New(files fs.FS, opts Options) *amaro.App {
	opts = opts.withDefaults()

	index, err := buildIndex(files, opts.AssetPrefix)
	if err != nil {
		panic("staticserver: cannot index the site: " + err.Error())
	}

	app := amaro.New(
		// amaro.New installs no router at all; App.GET would panic on a nil
		// interface without this option.
		amaro.WithRouter(routers.NewTrieRouter()),
		amaro.WithErrorHandler(errorHandler(index[opts.NotFoundPath])),
	)
	// Recovery is already installed by amaro.New.
	app.Use(securityHeaders())

	static := serveAsset(index)
	access := logging()

	// v0.4.0 has no App.Any, so GET and HEAD are registered by hand. A static
	// route wins over the wildcard in the trie, and "/*filepath" also matches
	// "/" with an empty parameter.
	mustAdd(app.GET("/healthz", healthz))
	mustAdd(app.HEAD("/healthz", healthz))
	mustAdd(app.GET("/*filepath", static, access))
	mustAdd(app.HEAD("/*filepath", static, access))

	return app
}

// mustAdd converts a route registration failure into a panic. The only way the
// router can refuse a route is a programming error in this file.
func mustAdd(err error) {
	if err != nil {
		panic("staticserver: cannot register route: " + err.Error())
	}
}

// errorHandler replaces amaro's default, which writes NewHTTPError's message as
// plain text. Every not-found becomes the prerendered 404 page with a real 404
// status; everything else becomes a bare status line, so an internal error never
// reaches the client.
func errorHandler(notFound *asset) amaro.ErrorHandler {
	return func(c *amaro.Context, err error, code int) {
		status := code

		var httpErr *amaro.HTTPError
		if errors.As(err, &httpErr) {
			status = httpErr.Code
		}
		if status < 400 || status > 599 {
			status = http.StatusInternalServerError
		}

		if status == http.StatusNotFound && notFound != nil {
			header := c.Writer.Header()
			header.Set("Content-Type", notFound.contentType)
			header.Set("Cache-Control", revalidateCacheControl)
			header.Set("Content-Length", strconv.Itoa(len(notFound.body)))
			c.Writer.WriteHeader(http.StatusNotFound)
			if c.Request.Method != http.MethodHead {
				//nolint:errcheck // the connection is already gone if this fails
				c.Writer.Write(notFound.body)
			}
			return
		}

		http.Error(c.Writer, http.StatusText(status), status)
	}
}

// healthz answers the three Kubernetes probes. It is registered without the
// access-log middleware, so a probe every few seconds costs nothing and hides
// nothing in the logs.
func healthz(c *amaro.Context) error {
	header := c.Writer.Header()
	header.Set("Content-Type", "text/plain; charset=utf-8")
	header.Set("Cache-Control", noStoreCacheControl)
	return c.String(http.StatusOK, "ok")
}
