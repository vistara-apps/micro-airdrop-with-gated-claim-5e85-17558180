module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240 5% 10%)',
        text: 'hsl(0 0% 95%)',
        muted: 'hsl(0 0% 70%)',
        accent: 'hsl(180 70% 50%)',
        primary: 'hsl(240 80% 60%)',
        surface: 'hsl(240 5% 15%)',
        success: 'hsl(120 60% 50%)',
        warning: 'hsl(45 90% 60%)',
        error: 'hsl(0 70% 60%)',
      },
      spacing: {
        xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px',
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px', xl: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.1)',
        glow: '0 0 20px hsla(180, 70%, 50%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
