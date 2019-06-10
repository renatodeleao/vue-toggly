const pkg = require("../../package.json");

module.exports = {
  title: 'Library Title',
  description: `${pkg.description}`,
  base: `/${pkg.name}/`,
  version: pkg.version,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    repo: `${pkg.repository.url}`,
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    //repoLabel: 'Contribute!',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],

    sidebarDepth: 2,
    sidebar: [
      '/guide/introduction',
    ]
  }
}