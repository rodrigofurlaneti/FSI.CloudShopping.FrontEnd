/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Varre todas as subpastas da src
    ],
    theme: {
        extend: {
            colors: {
                americanas: '#ff0033',
            }
        },
    },
    plugins: [],
}