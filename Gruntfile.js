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
    'string-replace': {
      console: {
        files: [{
          expand: true,
          src: 'feature-detects/**/*.js'
        }],
        options: {
          replacements: [{
            pattern: /(\r?\n|\r)?[ \t]*console\.(log|error)\([^;]*\);[ \t]*/g,
            replacement: ''
          }]
        }
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint']);

  grunt.registerTask('test', ['lint']);
};
