/*global module */

module.exports = function(grunt) {
  'use strict';

  // load grunt dependencies
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jscs: {
      src: [
        'Gruntfile.js',
        'src/*.js',
        'lib/*.js',
        'test/**/*.js',
        'feature-detects/**/*.js',
        '!src/html5printshiv.js',
        '!test/coverage/**/*.js',
        '!test/js/lib/**/*.js',
        '!src/html5shiv.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: true,
      },
      files: [
        'Gruntfile.js',
        'src/*.js',
        'lib/*.js',
        'feature-detects/**/*.js'
      ]
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint']);

  grunt.registerTask('test', ['lint']);
};
