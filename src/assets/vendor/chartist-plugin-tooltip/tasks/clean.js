/**
 * clean
 * =====
 *
 * Remove temporary and unused files.
 *
 * Link: https://github.com/gruntjs/grunt-contrib-clean
 */

module.exports = function (grunt) {
  return {
    tmp: "<%= pkg.config.tmp %>",
    dist: "<%= pkg.config.dist %>",
  };
};
