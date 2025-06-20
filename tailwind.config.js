/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        pink: {
          700: '#e6007e',
          500: '#ffadb5',
          400: '#ffcece',
          300: '#ffe3ec',
          200: '#fffafe',
        },
        gray: {
          700: '#6b6b6b',
          500: '#d9dadb',
          400: '#e9e8e8',
          200: '#f8f8f8',
        },
        peach: {
          400: '#ffd3b6',
          300: '#fff1e6',
          200: '#f9f7f5',
        },
        mint: {
          700: '#54ddca',
          400: '#a8e6cf',
          200: '#f5fdef',
        },
        purple: {
          700: '#a34eef',
          400: '#e0beff',
          200: '#f5edff',
        },
        white: '#ffffff',
        black: '#333333',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
      },
      fontSize: {
        // 데스크탑 폰트 크기
        'heading-1': ['36px', '44px'],
        'heading-2': ['24px', '36px'],
        'heading-3': ['20px', '26px'],
        'body-large': ['16px', '24px'],
        'body-medium': ['14px', '20px'],
        'body-small': ['12px', '18px'],
        // 모바일 폰트 크기
        'm-heading-1': ['32px', '38px'],
        'm-heading-2': ['26px', '30px'],
        'm-heading-3': ['20px', '26px'],
        'm-body-large': ['16px', '22px'],
        'm-body-medium': ['14px', '18px'],
        'm-body-small': ['13px', '16px'],
        'm-body-add': ['11px', '14px'],
      },
      fontWeight: {
        300: '300',
        500: '500',
        700: '700',
      },
      boxShadow: {
        'soft-black': '0 0 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
