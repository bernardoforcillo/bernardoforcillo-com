// Command server serves the prerendered bernardoforcillo.com build from inside
// the binary. The embed lives here rather than in the library because go:embed
// can only reach files inside its own module.
package main

import (
	"embed"
	"io/fs"
	"log"
	"os"

	staticserver "github.com/bernardoforcillo/bernardoforcillo-com/packages/static-server"
)

// dist is filled by the Docker build, which copies apps/www/dist/client here
// before compiling. The committed .gitkeep keeps this pattern matching - and so
// the package compiling - on a clean checkout.
//
//go:embed all:dist
var embedded embed.FS

func main() {
	site, err := fs.Sub(embedded, "dist")
	if err != nil {
		log.Fatalf("server: cannot open the embedded site: %v", err)
	}

	app := staticserver.New(site, staticserver.Options{
		NotFoundPath: "404/index.html",
		AssetPrefix:  "/assets/",
		ConfigEnv:    []string{"GTM_ID"},
	})

	// app.Run installs the SIGTERM and interrupt handlers and gives in-flight
	// requests five seconds to finish, well inside the pod's 30s termination
	// grace period.
	if err := app.Run(listenPort(os.Getenv("PORT"))); err != nil {
		log.Fatalf("server: %v", err)
	}
}

// listenPort turns the PORT environment variable into the address amaro's Run
// expects, which prefixes a colon itself when one is missing.
func listenPort(port string) string {
	if port == "" {
		return "3000"
	}
	return port
}
