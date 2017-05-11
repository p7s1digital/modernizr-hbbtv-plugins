/*global module */

var fs = require('fs');
var _ = require('underscore');

module.exports = function(grunt) {
  'use strict';

  // load grunt dependencies
  require('load-grunt-tasks')(grunt);

  var features = fs.existsSync(__dirname + '/dist/modernizr-hbbtv.js') ?
    _.without(
      fs.readFileSync(__dirname + '/dist/modernizr-hbbtv.js').toString()
      .match(/https:\/\/modernizr\.com\/download\?([^\n\r]*)/)[1]
      .replace(/^-/, '')
      .split('-')
      .map(function(test) { return test.replace(/_.*$/, ''); }),
      'addtest', 'setclasses', 'shiv', 'dontmin')
    .concat(['hbbtv', 'hbbtvvideo', 'hbbtvdrm', 'hbbtvoipfobjectfactory']) : [];
  console.log(features);

  grunt.initConfig({
    jscs: {
      src: [
        'Gruntfile.js',
        'feature-detects/**/*.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: true
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
    },
    template: {
      test: {
        options: {
          data: {
            columns: 8,
            features: features,
            cacheBuster: (new Date()).getTime()
          }
        },
        files: {
          'test/index.xhtml': 'test/index.tmpl.xhtml'
        }
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint']);

  grunt.registerTask('test', ['lint']);
};
