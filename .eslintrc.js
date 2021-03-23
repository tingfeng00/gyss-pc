module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'eqeqeq': 'off',
    'no-tabs' :"off",
    'no-trailing-spaces' : 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'quotes': 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
