/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      backgroundColor: {
        'custom-color': '#f3a847',
      },
      borderColor: {
        'custom-color': '#f3a847',
      },
    },
  },
  plugins: [ require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
}

