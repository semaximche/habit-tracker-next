/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            primary: {
                light: '#607d8b',
                dark: '#293548',
            },
            secondary: {
                light: '#eceff1',
                dark: '#111628',
            },
            background: {
                light: '#fafafa',
                dark: '#0F172A',
            },
            foreground: {
                light: '#f5f5f5',
                dark: '#1E293B',
            },
            accent: {
                light: '#4f6773',
                dark: '#8A98AD',
            },
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
});
