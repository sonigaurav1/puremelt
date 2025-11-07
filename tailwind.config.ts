import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			fontFamily: {
				tilillium_web: ['var(--font-tilillium_web)', 'sans-serif'],
				playfair: ['var(--font-playfair)', 'serif'],
				inter: ['var(--font-inter)', 'sans-serif'],
				ibm: ['var(--font-ibmplex)'],
				parisienne: ['var(--font-parisienne)', 'cursive']
			},
			colors: {
				pista: 'var(--pista)', // Pista Green,
				'pista-light': 'var(--pista-light)', // Light Pista Green
				'primary-color': 'var(--primary-color)', // Primary Red
				'primary-light': 'var(--primary-light)', // Light Primary Red
				'primary-dark': 'var(--primary-dark)', // Dark Primary Red
				'secondary-color': 'var(--secondary-color)', // Secondary Color
				'secondary-light': 'var(--secondary-light)', // Light Secondary Color
				'sub-heading': 'var(--sub-heading)', // Sub-heading Color
				'page': 'var(--page)', // Page Background Color
				'page-light': 'var(--page-light)', // Light Page Background Color'
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"gradient-shift": {
					"0%": { "background-position": "0% 0%" },
					"100%": { "background-position": "200% 0%" }
				},
				progress: {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				"gradient-shift": 'gradient-shift 3s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				progress: "progress 3s linear",
				"fade-in": "fade-in 1s ease-in-out",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
