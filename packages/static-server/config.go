package staticserver

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/buildwithgo/amaro"
)

// configContentType is what /config.js is served as. The document loads it with
// a plain <script src>, before the analytics bootstrap that reads the global.
const configContentType = "application/javascript"

// renderConfigScript renders the allowlisted environment into a frozen global.
// This is how GTM_ID reaches the browser without being baked into the image at
// build time.
//
// A variable that is not set is omitted entirely rather than emitted as an empty
// string, so the bootstrap can tell "not configured" from "configured as
// nothing" and no-op cleanly in development and in tests. Values go through
// encoding/json, whose default HTML escaping rewrites the three characters
// that could break out of a script element - less-than, greater-than and
// ampersand - into their \u escapes, so a value can never close the tag.
func renderConfigScript(names []string) string {
	var builder strings.Builder
	builder.WriteString("globalThis.__APP_CONFIG__=Object.freeze({")

	first := true
	for _, name := range names {
		value, ok := os.LookupEnv(name)
		if !ok {
			continue
		}
		if !first {
			builder.WriteString(",")
		}
		first = false
		builder.Write(jsonString(name))
		builder.WriteString(":")
		builder.Write(jsonString(value))
	}

	builder.WriteString("});")
	return builder.String()
}

// jsonString encodes s as a JSON string literal. Marshalling a string cannot
// fail, so the error is discarded deliberately.
func jsonString(s string) []byte {
	encoded, _ := json.Marshal(s)
	return encoded
}

// configHandler serves a script rendered once at startup. The environment of a
// pod does not change while it runs, so there is nothing to re-read per request.
func configHandler(script string) amaro.Handler {
	body := []byte(script)

	return func(c *amaro.Context) error {
		header := c.Writer.Header()
		header.Set("Content-Type", configContentType)
		header.Set("Cache-Control", noStoreCacheControl)
		header.Set("Content-Length", strconv.Itoa(len(body)))

		c.Writer.WriteHeader(http.StatusOK)
		if c.Request.Method == http.MethodHead {
			return nil
		}

		_, err := c.Writer.Write(body)
		return err
	}
}
