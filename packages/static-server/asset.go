package staticserver

import (
	"bytes"
	"compress/gzip"
	"crypto/sha256"
	"encoding/hex"
	"io/fs"
	"strings"
)

const (
	// immutableCacheControl is served for content-hashed build output: the URL
	// changes whenever the bytes change, so the response never expires.
	immutableCacheControl = "public, max-age=31536000, immutable"

	// revalidateCacheControl is served for everything else. The client may keep
	// the response but must revalidate, which the ETag makes cheap.
	revalidateCacheControl = "public, max-age=0, must-revalidate"

	// noStoreCacheControl is served for responses that depend on the pod's
	// environment rather than on the build.
	noStoreCacheControl = "no-store"

	// compressMinSize is the smallest body worth gzipping. Below roughly one
	// packet the saving is noise and the gzip header is pure overhead.
	compressMinSize = 1024
)

// asset is one fully prepared response. Everything expensive - reading, hashing
// and compressing - happens once at startup, so a request costs a map lookup,
// a few header writes and one Write.
type asset struct {
	body         []byte
	gzipBody     []byte // nil when the asset is not worth precompressing
	contentType  string
	cacheControl string
	etag         string // quoted strong entity tag of the identity representation
	gzipETag     string // entity tag of the gzip representation, empty when gzipBody is nil
}

// buildIndex walks files once and prepares every regular file it finds. It is
// the answer to amaro's StaticHandler serving an embed.FS: embedded files report
// the zero modtime, so http.ServeContent emits no Last-Modified and no validator
// at all, and every visit re-downloads the whole site.
func buildIndex(files fs.FS, assetPrefix string) (map[string]*asset, error) {
	index := make(map[string]*asset)

	err := fs.WalkDir(files, ".", func(name string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if entry.IsDir() {
			return nil
		}

		body, err := fs.ReadFile(files, name)
		if err != nil {
			return err
		}

		sum := sha256.Sum256(body)
		digest := hex.EncodeToString(sum[:16])
		contentType := contentTypeFor(name)

		prepared := &asset{
			body:         body,
			contentType:  contentType,
			cacheControl: cacheControlFor(name, assetPrefix),
			etag:         `"` + digest + `"`,
		}

		if len(body) >= compressMinSize && isCompressible(contentType) {
			if compressed, ok := gzipBytes(body); ok {
				prepared.gzipBody = compressed
				// A different encoding is a different representation, so RFC 9110
				// requires a different entity tag.
				prepared.gzipETag = `"` + digest + `-gzip"`
			}
		}

		index[name] = prepared
		return nil
	})
	if err != nil {
		return nil, err
	}

	return index, nil
}

// cacheControlFor classifies a file by the URL it will be served under. name is
// the slash-separated path inside the filesystem, without a leading slash.
func cacheControlFor(name, assetPrefix string) string {
	if assetPrefix != "" && strings.HasPrefix("/"+name, assetPrefix) {
		return immutableCacheControl
	}
	return revalidateCacheControl
}

// gzipBytes compresses body at the highest level. It reports false when the
// result is not smaller than the input, which keeps the server from shipping
// more bytes than it was asked to.
func gzipBytes(body []byte) ([]byte, bool) {
	var buffer bytes.Buffer

	writer, err := gzip.NewWriterLevel(&buffer, gzip.BestCompression)
	if err != nil {
		return nil, false
	}
	if _, err := writer.Write(body); err != nil {
		return nil, false
	}
	if err := writer.Close(); err != nil {
		return nil, false
	}
	if buffer.Len() >= len(body) {
		return nil, false
	}

	return buffer.Bytes(), true
}
