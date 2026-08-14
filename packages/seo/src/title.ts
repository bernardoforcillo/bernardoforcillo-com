import { SITE_NAME, SITE_URL, TITLE_DEFAULT, TITLE_TEMPLATE } from './site';

export const absoluteUrl = (path: string): string =>
  new URL(path, SITE_URL).toString();

export const formatTitle = (title?: string): string =>
  title ? TITLE_TEMPLATE.replace('%s', title) : TITLE_DEFAULT;

/** The social variant, without the template's leading space. */
export const formatSocialTitle = (title?: string): string =>
  title ? `${title} - ${SITE_NAME}` : SITE_NAME;
