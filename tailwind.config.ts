import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#073C47',
          dark: '#052832',
        },
        accent: {
          DEFAULT: '#E7A8EC',
          light: '#F0C8F3',
          dark: '#D690DC',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'slide-in-right': 'slideInRight 0.6s ease-out 1s forwards',
        'slide-in-right-delay-1': 'slideInRight 0.6s ease-out 0.8s forwards',
        'slide-in-right-delay-2': 'slideInRight 0.6s ease-out 1.6s forwards',
        'fade-in-bounce': 'fadeInBounce 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s forwards',
        'fade-in-bounce-delay': 'fadeInBounce 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 3.5s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInBounce: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8) translateY(10px)'
          },
          '60%': { 
            opacity: '1',
            transform: 'scale(1.02) translateY(-2px)'
          },
          '80%': { 
            transform: 'scale(0.99) translateY(1px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config