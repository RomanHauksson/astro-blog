/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				flash: {
					'from': { 'background-color': 'rgba(255, 255, 255, 0.2)' },
					'to': { 'background-color': 'transparent' }
				}
			},
			animation: {
				flash: 'flash 1s'
			}
		},
	},
	plugins: [require('@tailwindcss/typography'),],
}
