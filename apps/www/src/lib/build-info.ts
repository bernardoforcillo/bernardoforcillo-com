/**
 * Frozen at build time on purpose. `new Date().getFullYear()` evaluated during
 * prerender would bake the build year into every page anyway, but silently.
 */
export const BUILD_YEAR = __BUILD_YEAR__;
