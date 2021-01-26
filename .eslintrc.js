/*
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2020-11-25 15:35:02
 * @Describe: 
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'linebreak-style': 'off', 
    'global-require': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'import/no-unresolved': 'off',
    'spaced-comment': 'off',
    'import/prefer-default-export': 'off',
    'no-duplicate-imports': 0,
    'max-len': ['error', { code: 200 }],
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'always-multiline'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
