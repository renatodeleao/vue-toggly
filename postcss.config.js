const { banner } = require("./utils")

const postcssConfig = (context => {
  const plugins =  [
    require('autoprefixer'),
    require('cssnano')({ preset: 'default'}),
    require('postcss-banner')({banner: banner, important: true})
  ]

  return {
    plugins
  }
})();

module.exports = postcssConfig