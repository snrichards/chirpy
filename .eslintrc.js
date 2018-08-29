module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'no-prototype-builtins': 0,
    'max-len': ['error', { code: 80, ignoreTrailingComments: true }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
