import type { Plugin, UserConfig } from 'vite';

export type PrerenderPage = {
  path: string;
  sitemap?: {
    exclude?: boolean;
    priority?: number;
    changefreq?:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  };
  prerender?: {
    enabled?: boolean;
    outputPath?: string;
  };
};

export type CreateAppConfigOptions = {
  /** Absolute path to the application root (the folder holding vite.config.ts). */
  root: string;
  /** Required by the sitemap plugin; the build throws without it. */
  sitemapHost: string;
  /** Explicit prerender entries for param routes crawlLinks cannot reach. */
  pages?: PrerenderPage[];
  /** Extra plugins, inserted before the framework plugins. */
  plugins?: Array<Plugin | Plugin[]>;
};

export declare const createAppConfig: (
  options: CreateAppConfigOptions,
) => UserConfig;
