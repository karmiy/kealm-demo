module.exports = {
    extends: ['./eslintrc.react.js', './eslintrc.typescript.js'],

    rules: { 
        'no-console': 0,
        'react/prop-types': 0, // typescript 下可不使用 prop-types
    },
};