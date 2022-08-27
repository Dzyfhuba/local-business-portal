/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#00D06A',
                secondary: '#0065D0',
                ternary: '#00CDD0',
                base: '#FFF5F5'
            },
        },
    },
    important: true,
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}