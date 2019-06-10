import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import vue from "rollup-plugin-vue";
import sass from "rollup-plugin-sass";
import { terser } from "rollup-plugin-terser";
//https://stackoverflow.com/questions/41128621/proper-way-to-chain-postcss-and-sass-in-rollup
import postcss from "postcss";
import pkg from "./package.json";

const { banner } = require("./utils");
const postcssConfig = require("./postcss.config.js");

const rollupBabelConfig = {
  //exclude: ["node_modules/**"],
  extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue", ".ts"]
};

const rollupSassOptions = {
  output: `dist/${pkg.name}.css`,
  // Processor will be called with two arguments:
  // - style: the compiled css
  // - id: import id
  processor: css =>
    postcss(postcssConfig.plugins)
      .process(css)
      .then(result => result.css)
};

const terserConfig = {
  output: {
    comments: "some"
  }
};

const umdPlugins = [resolve()];

const commonPlugins = [
  sass(rollupSassOptions),
  vue({
    css: true, // default to false if want a file extracted
    style: {
      postcssPlugins: postcssConfig.plugins.filter(p => Object.keys(p).includes("postcss-banner"))
    }
  })
];

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      exports: 'named',
      name: pkg.name,
      file: pkg.main,
      banner,
      format: "umd"
    },
    plugins: [...umdPlugins, ...commonPlugins]
  },
  // minified
  {
    input: "src/index.js",
    output: {
      exports: 'named',
      name: pkg.name,
      file: pkg.unpkg,
      banner,
      format: "umd"
    },
    plugins: [
      ...umdPlugins,
      ...commonPlugins,
      babel(rollupBabelConfig),
      terser(terserConfig)
    ]
  },
  {
    input: "src/index.js",
    output: [
      {
        exports: 'named',
        banner, file: pkg.module, format: 'es',  sourcemap: true
      },
    ],
    external: Object.keys(pkg.dependencies || {}),
    plugins: commonPlugins,
  }
];
