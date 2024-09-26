/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			'primary': '#035FAA',
  			'secondary': '#FE4500',
  			'background': '#FFFFFF',
  			'secondary-background': '#F7F8F9',
  			'primary-text': '#101116',
  			'secondary-text': '#FFFFFF',
  			'light-text': '#6B6C7E',
  			'border': '#D2D2D2',
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
  			}
  		},
  		fontFamily: {
  			'sf-regular': 'sf-regular',
  			'sf-bold': 'sf-bold',
  			'sf-blackitalic': 'sf-blackitalic',
  			'sf-bolditalic': 'sf-bolditalic',
  			'sf-medium': 'sf-medium',
  			'sf-lightitalic': 'sf-lightitalic'
  		},
  		fontSize: {
  			'display-80': '80px',
  			'display-72': '72px',
  			'display-60': '60px',
  			'main-42': '42px',
  			'main-38': '36px',
  			'main-32': '32px',
  			'title-28': '28px',
  			'title-24': '24px',
  			'subtitle-18': '18px',
  			'body-18': '18px',
  			'body-16': '16px',
  			'detail-14': '14px',
  			'small-12': '12px',
  			'extra-small': '10px'
  		},
  		borderWidth: {
  			'1': '1px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
