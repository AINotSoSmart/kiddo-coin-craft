import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html",
    "./src/index.css",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "kid-purple": "#d3a2ff",
		"kid-purple2": "#931aff",

        "kid-teal": "#14B8A6",
        "kid-yellow": "#FBBF24",
        "kid-pink": "#EC4899",
        "kid-blue": "#7fbfff",
        "kid-orange": "#F97316",
        "kid-green": "#22C55E",
        "kid-red": "#EF4444",
        kid: {
          purple: "#8B5CF6",
          teal: "#14B8A6",
          yellow: "#FBBF24",
          pink: "#EC4899",
          blue: "#3B82F6",
          orange: "#F97316",
          green: "#10B981",
          red: "#EF4444",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "var(--radius)",
      },
      // Add custom CSS variables directly in the config
      custom: {
        "--background": "0 0% 100%", // Light mode default
        "--foreground": "0 0% 0%",
        "--card": "0 0% 100%",
        "--card-foreground": "0 0% 0%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "0 0% 0%",
        "--primary": "50 100% 57%",
        "--primary-foreground": "0 0% 0%",
        "--secondary": "0 0% 95%",
        "--secondary-foreground": "0 0% 0%",
        "--muted": "0 0% 95%",
        "--muted-foreground": "0 0% 45%",
        "--accent": "50 100% 95%",
        "--accent-foreground": "0 0% 0%",
        "--destructive": "0 70% 60%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "0 0% 0%",
        "--input": "0 0% 80%",
        "--ring": "50 100% 57%",
        "--radius": "0.75rem",
        "--sidebar-background": "0 0% 98%",
        "--sidebar-foreground": "240 5.3% 26.1%",
        "--sidebar-primary": "240 5.9% 10%",
        "--sidebar-primary-foreground": "0 0% 98%",
        "--sidebar-accent": "240 4.8% 95.9%",
        "--sidebar-accent-foreground": "240 5.9% 10%",
        "--sidebar-border": "220 13% 91%",
        "--sidebar-ring": "217.2 91.2% 59.8%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        jiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "confetti-explosion": {
          "0%": { transform: "translateY(0) scale(0)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(1)", opacity: "0" },
        },
        "coin-spin": {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        bounce: "bounce 2s infinite ease-in-out",
        jiggle: "jiggle 0.5s ease-in-out",
        float: "float 3s infinite ease-in-out",
        confetti: "confetti-explosion 1s forwards ease-out",
        "coin-spin": "coin-spin 0.5s ease-in-out",
        pop: "pop 0.4s ease-out",
        "pulse-scale": "pulse-scale 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;