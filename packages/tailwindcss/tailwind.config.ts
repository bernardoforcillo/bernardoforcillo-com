import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultTheme';

const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ['var(--font-open-sans)', ...defaultConfig.fontFamily.sans],
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
