// Shared by the post route (which points og:image at the file) and by
// scripts/og-images.mjs (which writes it after the build). Node runs this file
// directly with type stripping, so it must stay import-free and plain TS.

/** Open Graph's recommended size: what LinkedIn, X and Slack crop to. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Root-relative path of a blog post's share image, under dist/client. */
export const blogOgImagePath = (categorySlug: string, postSlug: string) =>
  `/og/blog/${categorySlug}/${postSlug}.png`;
