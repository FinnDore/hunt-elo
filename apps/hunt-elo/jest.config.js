module.exports = {
    displayName: 'hunt-elo',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
        '^.+\\.[tj]sx?$': [
            '@swc/jest',
            {
                jsc: { transform: { react: { runtime: 'automatic' } } },
                module: { type: 'node' },
            },
        ],
    },
    transformIgnorePatterns: ['^node_modules\\@tauri-apps\\.*(.js)$'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/apps/hunt-elo',
};
