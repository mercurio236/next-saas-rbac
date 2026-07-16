/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */

const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false, //ponto e virgula nofinal,
  singleQuote: true,
  quoteProps: "as-needed", //coloca aspas dentro a propriedade se ncessário e vai funcionar normal
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true, //se ele coloca espaço dps das chaves
  arrowParens: "always",
  endOfLine: "auto",
  bracketSameLine: false,
};

export default config;
