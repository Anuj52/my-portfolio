/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151f32',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          DEFAULT: '#38bdf8', // sky-400
          hover: '#0ea5e9', // sky-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}