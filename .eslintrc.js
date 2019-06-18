module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'google',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'prefer-promise-reject-errors': 'off',
    'max-len': 'off',
  },
};
