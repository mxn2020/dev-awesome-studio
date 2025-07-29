/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		animation: {
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'gradient-y': 'gradient-y 15s ease infinite',
  			'gradient-xy': 'gradient-xy 15s ease infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'bounce-gentle': 'bounce-gentle 2s infinite',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'wiggle': 'wiggle 1s ease-in-out infinite',
  			'slide-up': 'slide-up 0.5s ease-out',
  			'slide-down': 'slide-down 0.5s ease-out'
  		},
  		keyframes: {
  			'gradient-y': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'center top'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'center center'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'gradient-xy': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
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
  			},
  			'bounce-gentle': {
  				'0%, 100%': {
  					transform: 'translateY(-5%)',
  					'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(0)',
  					'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			},
  			'wiggle': {
  				'0%, 100%': { transform: 'rotate(-3deg)' },
  				'50%': { transform: 'rotate(3deg)' }
  			},
  			'slide-up': {
  				'0%': { transform: 'translateY(100%)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			'slide-down': {
  				'0%': { transform: 'translateY(-100%)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			},
  			// Todo app specific colors
  			todo: {
  				primary: '#10b981', // Green
  				secondary: '#3b82f6', // Blue
  				accent: '#8b5cf6', // Purple
  				warning: '#f59e0b', // Amber
  				danger: '#ef4444', // Red
  				success: '#22c55e', // Green
  				info: '#06b6d4' // Cyan
  			},
  			priority: {
  				low: '#22c55e',
  				medium: '#f59e0b',
  				high: '#ef4444',
  				urgent: '#dc2626'
  			},
  			category: {
  				work: '#3b82f6',
  				personal: '#10b981',
  				health: '#f59e0b',
  				learning: '#8b5cf6',
  				shopping: '#ec4899',
  				finance: '#06b6d4'
  			}
  		},
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			heading: ['Poppins', 'system-ui', 'sans-serif']
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		boxShadow: {
  			'todo': '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
  			'todo-lg': '0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)',
  			'priority-high': '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)',
  			'priority-medium': '0 4px 6px -1px rgba(245, 158, 11, 0.1), 0 2px 4px -1px rgba(245, 158, 11, 0.06)',
  			'priority-low': '0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}