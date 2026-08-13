package staticserver

import (
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/buildwithgo/amaro"
)

// securityHeaders stamps the three headers a static site needs on every
// response, including error responses.
//
// amaro ships middlewares.Secure, which is not used here for two reasons: it
// has no field for Referrer-Policy, and importing
// github.com/buildwithgo/amaro/middlewares links golang-jwt/jwt/v5 and the
// sessions addon into a binary whose entire job is writing bytes from memory.
func securityHeaders() amaro.Middleware {
	return func(next amaro.Handler) amaro.Handler {
		return func(c *amaro.Context) error {
			header := c.Writer.Header()
			header.Set("X-Content-Type-Options", "nosniff")
			header.Set("Referrer-Policy", "strict-origin-when-cross-origin")
			header.Set("X-Frame-Options", "DENY")
			return next(c)
		}
	}
}

// logging writes one line per request. It is attached per route rather than
// globally so that the three Kubernetes probes hitting /healthz every few
// seconds never reach it; amaro's middlewares.Logger has no skip hook.
func logging() amaro.Middleware {
	return func(next amaro.Handler) amaro.Handler {
		return func(c *amaro.Context) error {
			start := time.Now()

			recorder := &statusWriter{ResponseWriter: c.Writer, status: http.StatusOK}
			c.Writer = recorder

			err := next(c)

			status := recorder.status
			// The error handler runs after this middleware returns, so the status
			// it is about to write is only visible through the error itself.
			var httpErr *amaro.HTTPError
			if errors.As(err, &httpErr) {
				status = httpErr.Code
			}

			log.Printf("%s %s %d %s", c.Request.Method, c.Request.URL.Path, status,
				time.Since(start).Round(time.Microsecond))

			return err
		}
	}
}

// statusWriter records the status code written through it, which amaro's
// Context does not expose.
type statusWriter struct {
	http.ResponseWriter
	status int
}

func (w *statusWriter) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}
