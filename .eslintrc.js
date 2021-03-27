const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {},
    overrides: [
        // tests, no restrictions (runs in Node / jest with jsdom)
        {
            files: ['**/__tests__/**', 'test-dts/**'],
            rules: {
                'no-restricted-globals': 'off',
                'no-restricted-syntax': 'off'
            }
        }
    ]
};
