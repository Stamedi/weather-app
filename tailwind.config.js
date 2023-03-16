/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      light: '#fff7ed',
      beige: '#FBE0C3',
      pink: '#FFBB98',
      gray: '#7d8E95',
      'dark-gray': '#344648',
    },
    extend: {
      textShadow: { DEFAULT: '0 0 2px #fff' },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
