/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#070d1d',
          850: '#0b152d',
          800: '#0f1f3d',
          700: '#1a2e56',
          600: '#26427a',
        },
        gold: {
          100: '#fef9e7',
          200: '#fcf0c0',
          300: '#f9e491',
          400: '#e9cb55',
          500: '#d4af37', // signature metallic gold
          600: '#b89428',
          700: '#91711c',
          800: '#6c5317',
          900: '#4a3810',
        },
        azure: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        sand: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#eae0d2',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fceaa6 0%, #d4af37 50%, #aa820a 100%)',
        'navy-gradient': 'linear-gradient(180deg, #070d1d 0%, #030712 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
