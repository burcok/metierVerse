/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,vue}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundColor:{
        'primary-color': '#00A6EC',
      },
      colors: {
        'primary-color': '#00A6EC',
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

