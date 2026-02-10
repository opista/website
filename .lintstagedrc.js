const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{js,jsx,ts,tsx,css,md,mdx,html,json,js,jsx,ts,tsx}": [buildPrettierCommand],
};
