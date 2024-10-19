import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx, ts}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)'],
    },
  },
  plugins: [],
} satisfies Config;
