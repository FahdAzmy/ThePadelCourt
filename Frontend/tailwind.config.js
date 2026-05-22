/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#c4c9ac",
        "on-secondary-fixed": "#07006c",
        "secondary-fixed-dim": "#c1c1ff",
        "on-tertiary-fixed-variant": "#930005",
        "on-error-container": "#ffdad6",
        "surface-container-low": "#1c1b1b",
        "on-background": "#e5e2e1",
        "error": "#ffb4ab",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "primary": "#ffffff",
        "error-container": "#93000a",
        "on-tertiary-container": "#ca0a0f",
        "on-secondary-fixed-variant": "#2e2bc2",
        "tertiary-fixed-dim": "#ffb4aa",
        "on-primary": "#283500",
        "primary-container": "#c3f400",
        "on-tertiary": "#690003",
        "outline-variant": "#444933",
        "on-primary-fixed-variant": "#3c4d00",
        "surface-container-lowest": "#0e0e0e",
        "primary-fixed-dim": "#abd600",
        "secondary-fixed": "#e1e0ff",
        "on-primary-fixed": "#161e00",
        "primary-fixed": "#c3f400",
        "on-secondary-container": "#b0b1ff",
        "secondary-container": "#312ec5",
        "inverse-on-surface": "#313030",
        "on-error": "#690005",
        "inverse-primary": "#506600",
        "tertiary": "#ffffff",
        "background": "#131313",
        "surface-bright": "#3a3939",
        "surface-variant": "#353534",
        "outline": "#8e9379",
        "on-tertiary-fixed": "#410001",
        "inverse-surface": "#e5e2e1",
        "secondary": "#c1c1ff",
        "on-primary-container": "#556d00",
        "on-secondary": "#1200a9",
        "tertiary-container": "#ffdad5",
        "surface-dim": "#131313",
        "surface-tint": "#abd600",
        "tertiary-fixed": "#ffdad5",
        "surface-container": "#201f1f",
        "on-surface": "#e5e2e1",
        "surface": "#131313"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      spacing: {
        "xl": "64px",
        "gutter": "16px",
        "margin-mobile": "20px",
        "sm": "12px",
        "xs": "4px",
        "md": "24px",
        "margin-desktop": "80px",
        "lg": "40px",
        "base": "8px"
      },
      fontFamily: {
        "headline-lg-mobile": ["Outfit", "sans-serif"],
        "headline-lg": ["Outfit", "sans-serif"],
        "display-lg": ["Outfit", "sans-serif"],
        "headline-md": ["Outfit", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(204, 255, 0, 0.5)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s infinite',
        slowZoom: 'slowZoom 20s linear infinite'
      }
    },
  },
  plugins: [],
};
