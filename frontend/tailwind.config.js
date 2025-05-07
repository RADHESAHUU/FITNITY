/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        fitnityBlue: '#3498db',
        neonPurple: '#8e44ad',
        deepBlack: '#0a0b1e',
        'card-bg': '#101626',
      },
      boxShadow: {
        neonPurple: '0 0 15px #8e44ad, 0 0 30px #8e44ad',
        glow: '0 0 15px var(--glow-color, #00C6FF)',
        'glow-hover': '0 0 25px var(--glow-color, #00C6FF)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 15px var(--glow-color, #00C6FF)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 25px var(--glow-color, #00C6FF)',
            transform: 'scale(1.02)'
          },
        },
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};