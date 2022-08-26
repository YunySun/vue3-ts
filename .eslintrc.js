/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-05-31 10:20:15*
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-26 15:18:05
 * @Profile: 一个比较废柴的前端开发
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        // '@vue/typescript/recommended',
        'plugin:import/recommended',
        'airbnb-base',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                trailingComma: 'es5',
                printWidth: 120,
                bracketSpacing: true,
                endOfLine: 'auto', // 结束行形式
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'e', // for e.returnvalue
                    'ctx', // for Koa routing
                    'req', // for Express requests
                    'request', // for Express requests
                    'res', // for Express responses
                    'response', // for Express responses
                    'state', // for vuex state
                ],
            },
        ],
        'import/prefer-default-export': 'off',
        'import/extensions': [
            // 1 忽略后缀报错 2个都需要配置
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
            },
        ],
        '@typescript-eslint/no-var-requires': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'prefer-const': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.vue', '.json', '.ts', '.d.ts'], // 2 忽略后缀报错
            },
        },
    },
};
