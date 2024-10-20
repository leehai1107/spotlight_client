/**
 * jasmine
 * =======
 *
 * Test settings
 *
 * Link: https://github.com/gruntjs/grunt-contrib-jasmine
 */

module.exports = function (grunt) {
  return {
    dist: {
      src: [
        "node_modules/chartist/dist/chartist.js",
        "<%= pkg.config.src %>/scripts/<%= pkg.config.src_name %>.js",
      ],
      options: {
        specs: "<%= pkg.config.test %>/spec/**/spec-*.js",
        helpers: "<%= pkg.config.test %>/spec/**/helper-*.js",
        phantomjs: {
          "ignore-ssl-errors": true,
        },
      },
    },
  };
};
