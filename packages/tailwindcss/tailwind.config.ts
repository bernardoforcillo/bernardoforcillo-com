import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultTheme';

const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'azure-radiance': {
          '50': '#edf9ff',
          '100': '#d7efff',
          '200': '#b9e5ff',
          '300': '#88d7ff',
          '400': '#50bfff',
          '500': '#289fff',
          '600': '#0a7eff', // brand color
          '700': '#0a69eb',
          '800': '#0f54be',
          '900': '#134a95',
          '950': '#112e5a',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...defaultConfig.fontFamily.sans],
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
