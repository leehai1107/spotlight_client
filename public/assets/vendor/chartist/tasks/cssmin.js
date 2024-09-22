/**
 * cssmin
 * ======
 *
 * CSS min for the library.
 *
 * Link: https://github.com/gruntjs/grunt-contrib-cssmin
 */

module.exports = function (grunt) {
  return {
    dist: {
      options: {
        banner: "<%= pkg.config.banner %>",
      },
      files: {
        "<%= pkg.config.dist %>/chartist.min.css": [
          "<%= pkg.config.tmp %>/styles/chartist.css",
        ],
      },
    },
  };
};
