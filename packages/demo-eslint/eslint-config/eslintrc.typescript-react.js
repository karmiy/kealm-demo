module.exports = {
    extends: ['./eslintrc.base.js', './eslintrc.react.js', './eslintrc.typescript.js'],

    /** 规则 */
    rules: { 
        'react/prop-types': 0, // typescript 下可不使用 prop-types
    },
};
