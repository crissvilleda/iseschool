module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended"],
  rules: {
    quotes: ["error", "double"],
  },
};
