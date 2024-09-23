// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

const defaultFonts = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Noto Color Emoji"',
];

// const defaultSerifFonts = ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      dss: '325px',
      ds: '371px',
      xxs: '400px',
      xs: '475px',
      ...defaultTheme.screens,
    },

    extend: {
      colors: {
        'wise-purple': {
          light: '#9602AD',
          dark: '#4C1961',
        },
        'wise-gray': {
          light: '#A6A6A6',
          dark: '#272727',
          darker: '#818181',
        },
        'main-gray-bg': {
          darkNavy: '#030A23',
          darkerNavy: '#030715',
          dark: '#15171D',
          darkish: '#000410',
          darker: '#16071D',
        },
        'wise-green': {
          border: '#00FF79',
          bg: '#01AE53',
          text: '#00EB6F',
        },
      },
      backgroundImage: {
        hoverPurple: 'linear-gradient(90deg, #4C1961 0%, #FF000F 242.97%)',
      },
      fontFamily: {
        sans: ['DMSans', ...defaultFonts],
        clash: ['ClashDisplay', ...defaultFonts],
        poppins: ['DMSans', ...defaultFonts],
      },
      screens: {
        '3xl': '1500px',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
};
