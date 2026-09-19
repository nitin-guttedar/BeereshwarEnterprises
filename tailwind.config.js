/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sbe: {
          navy: '#0A2540',
          royal: '#0F4C81',
          blue: '#1E40AF',
          accent: '#2563EB',
          silver: '#64748B',
          platinum: '#94A3B8',
          lightSilver: '#E2E8F0',
          gold: '#F59E0B',
          amber: '#D97706',
        },
        industrial: {
          950: '#070B14',
          900: '#0D1527',
          850: '#131E36',
          800: '#1A2949',
          700: '#253966',
          600: '#344E85',
          500: '#4E6AA6',
          400: '#738DC4',
          300: '#9DB3DF',
          200: '#C9D7F2',
          100: '#EDF3FC',
          50: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-royal': '0 0 30px -5px rgba(30, 64, 175, 0.35)',
        'glow-gold': '0 0 25px -4px rgba(245, 158, 11, 0.3)',
        'card-light': '0 4px 20px -2px rgba(10, 37, 64, 0.08)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
