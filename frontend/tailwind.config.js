/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00A86B',
      },
    },
  },
  daisyui: {
    themes: [
      {
        zaibatsu: {
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          primary: '#00A86B',
        },
      },
      'lofi',
    ],
  },
  plugins: [require('daisyui')],
}
