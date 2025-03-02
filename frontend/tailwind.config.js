/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'instagram-blue': '#0095F6',
        'instagram-red': '#ED4956',
        'instagram-purple': '#8134AF',
        'instagram-pink': '#DD2A7B',
        'instagram-yellow': '#FFDC80',
      },
    },
  },
  plugins: [],
}
