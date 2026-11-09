// Class strings shared by the home organisms.

export const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700';

const BUTTON = `inline-flex items-center gap-2 rounded-full px-4.5 py-2.5 text-sm font-medium transition-colors ${FOCUS_RING}`;

export const BUTTON_PRIMARY = `${BUTTON} bg-deep-blue-500 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] hover:bg-deep-blue-600`;

export const BUTTON_SECONDARY = `${BUTTON} border border-deep-blue-200 bg-white text-deep-blue-900 hover:bg-deep-blue-50`;
