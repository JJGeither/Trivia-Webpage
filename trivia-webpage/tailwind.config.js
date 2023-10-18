/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
    plugins: [require('daisyui')],

}

