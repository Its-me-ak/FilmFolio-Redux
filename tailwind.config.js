/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '-13px 8px 10px 0px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}

