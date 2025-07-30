module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "airbnb-typescript", "next/core-web-vitals"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
