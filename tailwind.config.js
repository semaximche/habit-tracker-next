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
                dark: '#263238',
            },
            secondary: {
                light: '#eceff1',
                dark: '#13191c',
            },
            background: {
                light: '#fafafa',
                dark: '#212121',
            },
            foreground: {
                light: '#f5f5f5',
                dark: '#292929',
            },
            accent: {
                light: '#4f6773',
                dark: '#eceff1',
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
