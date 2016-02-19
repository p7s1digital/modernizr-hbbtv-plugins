/*global module */

module.exports = function(grunt) {
  'use strict';

  // load grunt dependencies
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jscs: {
      src: [
        'Gruntfile.js',
        'feature-detects/**/*.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: true,
      },
      files: [
        'Gruntfile.js',
        'feature-detects/**/*.js'
      ]
    },
    removelogging: {
      'feature-detects': {
        src: 'feature-detects/**/*.js'
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint']);

  grunt.registerTask('test', ['lint']);
};
