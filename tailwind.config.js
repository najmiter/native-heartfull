/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0a7ea4', // tintColorLight
          dark: '#FFFFFF', // tintColorDark
        },
        background: {
          light: '#FFFFFF',
          dark: '#151718',
        },
        text: {
          light: '#11181C',
          dark: '#ECEDEE',
        },
      },
    },
  },
  plugins: [],
  presets: [require('nativewind/preset')],
};
