import type { MetadataRoute } from '@bernardoforcillo/vite-seo';
import { SITE_DESCRIPTION, SITE_NAME } from '~/lib/seo';

export default (): MetadataRoute.Manifest => ({
  name: SITE_NAME,
  short_name: SITE_NAME,
  description: SITE_DESCRIPTION,
  start_url: '/',
  display: 'browser',
});
