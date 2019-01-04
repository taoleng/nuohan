module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": 'off',
    'quote': 'off',
    "no-unused-vars": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
    "no-trailing-spaces": 'off',
    'semi': 'off',
    "vue/max-attributes-per-line": 'off',
    'vue/html-self-closing': 'off',
    'vue/attributes-order': 'off',
    'vue/no-parsing-error': 'off',
    'vue/valid-v-model': 'off',
    'vue/attribute-hyphenation': 'off'
  }
};

