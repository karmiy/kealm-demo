const plugin = require('tailwindcss/plugin');

module.exports = {
    // 清除选项
    purge: ['./src/**/*.tsx'],
    // darkMode: 'false', // or 'media' or 'class'
    // darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            const buttons = {
                '.vvv': {
                    padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
                    borderRadius: theme('borderRadius.md'),
                    fontWeight: theme('fontWeight.600'),
                },
                '.vvv-indigo': {
                    backgroundColor: theme('colors.indigo.500'),
                    color: theme('colors.white'),
                    '&:hover': {
                        backgroundColor: theme('colors.indigo.600'),
                    },
                },
            };

            addComponents(buttons);
        }),
    ],
};
