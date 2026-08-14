/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#080a0f',
        canvas: '#0d1117',
        surface: '#131822',
        'surface-hover': '#1b2230',
        'surface-active': '#242e42',
        card: '#101520',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(245, 158, 11, 0.3)',
        'secondary-text': '#94a3b8',
        primary: '#f59e0b',
        'primary-hover': '#d97706',
        'primary-glow': 'rgba(245, 158, 11, 0.15)',
        'secondary-cta': '#334155',
        contrast: '#f8fafc',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25), 0 0 10px -3px rgba(245, 158, 11, 0.2)',
        'glow-cyan': '0 0 25px -5px rgba(14, 165, 233, 0.25), 0 0 10px -3px rgba(14, 165, 233, 0.2)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25), 0 0 10px -3px rgba(16, 185, 129, 0.2)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.4)' },
          '50%': { boxShadow: '0 0 30px 4px rgba(245, 158, 11, 0.25)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
