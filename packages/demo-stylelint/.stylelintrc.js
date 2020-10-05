module.exports = {
    extends: ['stylelint-config-recommended', 'stylelint-config-rational-order', 'stylelint-config-recommended-scss'],
    plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties', 'stylelint-scss'],
    rules: {
        'indentation': 4,
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*'],
}
  