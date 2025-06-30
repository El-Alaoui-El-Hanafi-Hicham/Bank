/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    prefix: 'tw-',
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                'primary-text': 'var(--primary-color-text)',
                surface: {
                    0: 'var(--surface-0)',
                    50: 'var(--surface-50)',
                    100: 'var(--surface-100)',
                    200: 'var(--surface-200)',
                },
                text: {
                    primary: 'var(--text-color)',
                    secondary: 'var(--text-color-secondary)',
                }
            },
            borderRadius: {
                DEFAULT: 'var(--border-radius)',
            }
        },
    },
    plugins: [],
}