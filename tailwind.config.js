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
        primary: {
          DEFAULT: '#0f172a', // Slate 900
          light: '#1e293b',   // Slate 800
          dark: '#020617',    // Slate 950
        },
        accent: {
          DEFAULT: '#38bdf8', // Sky 400
          hover: '#0ea5e9',   // Sky 500
          glow: 'rgba(56, 189, 248, 0.5)',
        },
        text: {
          primary: '#f8fafc', // Slate 50
          secondary: '#94a3b8', // Slate 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/assets/grid.svg')", // Placeholder if we add one later
      }
    },
  },
  plugins: [],
}