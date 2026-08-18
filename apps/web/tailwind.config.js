/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        canvas: '#F5F4F0',
        surface: '#FFFFFF',
        'surface-hover': '#F7F6F2',
        card: '#FFFFFF',
        border: '#E5E2D9',
        'border-hover': '#4285F4',
        'secondary-text': '#5F6368',
        primary: '#4285F4',
        'primary-hover': '#1A73E8',
        'primary-glow': 'rgba(66, 133, 244, 0.2)',
        'google-blue': '#4285F4',
        'google-blue-dark': '#1A73E8',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC04',
        'google-green': '#34A853',
        'google-charcoal': '#202124',
        'google-gray': '#5F6368',
        'google-bg': '#F8F9FA',
        dark: '#202124',
        'dark-surface': '#171717',
        contrast: '#202124',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(66, 133, 244, 0.35), 0 0 10px -3px rgba(66, 133, 244, 0.2)',
        'glow-gold': '0 0 25px -5px rgba(250, 161, 20, 0.35), 0 0 10px -3px rgba(250, 161, 20, 0.2)',
        'card-soft': '0 4px 20px -2px rgba(32, 33, 36, 0.05), 0 2px 6px -1px rgba(32, 33, 36, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(32, 33, 36, 0.08), 0 4px 12px -2px rgba(66, 133, 244, 0.15)',
        'material-m3': '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};
