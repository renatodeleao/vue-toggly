const pkg = require("./package.json");

const banner = `
/**
 * @preserve
 * @name ${pkg.name}
 * @version ${pkg.version}
 * @license: ${pkg.license}
 * © ${pkg.author}
*/`;

module.exports = { banner }
