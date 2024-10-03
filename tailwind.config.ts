import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx, ts}'],
  theme: {
    extend: {
      colors: {
        fiord: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d1dae6',
          300: '#a9bad0',
          400: '#7b95b5',
          500: '#5a789d',
          600: '#476082',
          700: '#3b4f6c', // locked color
          800: '#334359',
          900: '#2e3a4c',
          950: '#1f2532',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
