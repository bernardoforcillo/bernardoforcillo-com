// Class strings shared by the list and detail routes.

import { FOCUS_RING } from '~/features/home/styles';

export const ROW_CLASS = `content-row px-6 md:px-10 ${FOCUS_RING}`;

// 68ch matches the article header above, so title and body share one edge.
export const ARTICLE_CLASS = 'mx-auto max-w-[68ch] px-6 pt-2 pb-16 md:px-0';

export const TAG_CLASS =
  'rounded-full border border-deep-blue-200 bg-white px-2.5 py-0.5 text-xs text-deep-blue-600';
