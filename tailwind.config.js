/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
