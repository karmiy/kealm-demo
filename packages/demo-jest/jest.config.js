const path = require('path');

module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest', // 需要 ts-jest，否则在使用 jest.mock 时会 mock 不到
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.png$': '<rootDir>/src/plugins/file-transformer.js',
    },
    watchPlugins: ['<rootDir>/src/plugins/watch-plugin.js'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue', 'node'], // 类似 webpack resolve.extensions
    moduleDirectories: ['node_modules'], // 类似 webpack resolve.modules
    rootDir: path.join(__dirname),
    moduleNameMapper: {
        // .png 排除，在上面 transform 处理，测试自定义 transform
        '\\.(jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file-mock.ts',
        '\\.(css|less)$': 'identity-obj-proxy',
        '^@utils(.*)$': '<rootDir>/src/utils$1',
        '^@imgs(.*)$': '<rootDir>/src/imgs$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
    },
    'snapshotSerializers': ['jest-serializer-vue'], // vue 美化测试快照
    // 覆盖率，可以直接 npm run test:c
    // collectCoverage: true,
    // collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageReporters: ['html', 'text-summary'],
}