/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Google Colorography 4-Color Signature System
        'google-blue': '#4285F4',
        'google-blue-dark': '#1A73E8',
        'google-blue-light': '#8AB4F8',
        'google-red': '#EA4335',
        'google-red-dark': '#D93025',
        'google-red-light': '#F28B82',
        'google-yellow': '#FBBC04',
        'google-yellow-dark': '#F4B400',
        'google-yellow-light': '#FDD663',
        'google-green': '#34A853',
        'google-green-dark': '#188038',
        'google-green-light': '#81C995',

        // Material 3 / Google Surfaces
        background: '#17181c',
        canvas: '#1f2024',
        surface: '#28292e',
        'surface-hover': '#323339',
        'surface-active': '#3c3d44',
        card: '#202125',
        border: 'rgba(255, 255, 255, 0.12)',
        'border-hover': 'rgba(66, 133, 244, 0.4)',
        'secondary-text': '#9aa0a6',
        primary: '#4285F4',
        'primary-hover': '#1A73E8',
        'primary-glow': 'rgba(66, 133, 244, 0.25)',
        'secondary-cta': '#3c4043',
        contrast: '#e8eaed',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Google Sans"', 'Roboto', '-apple-system', 'sans-serif'],
        display: ['Outfit', '"Google Sans Display"', 'Roboto', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Google Sans Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-google-blue': '0 0 25px -5px rgba(66, 133, 244, 0.35), 0 0 10px -3px rgba(66, 133, 244, 0.25)',
        'glow-google-red': '0 0 25px -5px rgba(234, 67, 53, 0.35), 0 0 10px -3px rgba(234, 67, 53, 0.25)',
        'glow-google-yellow': '0 0 25px -5px rgba(251, 188, 4, 0.35), 0 0 10px -3px rgba(251, 188, 4, 0.25)',
        'glow-google-green': '0 0 25px -5px rgba(52, 168, 83, 0.35), 0 0 10px -3px rgba(52, 168, 83, 0.25)',
        'google-elevation-1': '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
        'google-elevation-2': '0 2px 6px 2px rgba(0,0,0,0.3), 0 1px 2px 0 rgba(0,0,0,0.2)',
        'google-elevation-3': '0 4px 8px 3px rgba(0,0,0,0.4), 0 1px 3px 0 rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'google-dots': 'googleDots 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        googleDots: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
