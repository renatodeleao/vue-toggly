module.exports = (api) => {
  api.cache(false);

  const presets = [
    ['@babel/preset-env', {
      modules: "auto",
      useBuiltIns: "usage",
      forceAllTransforms: true,
    }],
  ];

  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
  ]

  return { presets, plugins}
}