/*
 * Copyright (c) 2014, Fashiontec (http://fashiontec.org)
 * Licensed under LGPL, Version 3
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.initConfig({

    env: {
      test: {
        NODE_ENV: 'test',
        LOG_LEVEL: 'error'
      }
    },

    watch: {
      express: {
        files:  ['server.js', 'app.js', 'app/**/*'],
        tasks:  ['express:dev'],
        options: {
          spawn: false
        }
      }
    },

    express: {
      options: {
        port: process.env.PORT || 3000,
      },
      dev: {
        options: {
          script: './server.js',
          node_env: 'development'
        }
      }
    },

    mochaTest: {
      testUnit: {
        options: {
          reporter: 'spec'
        },
        src: ['test/unit/**/*.js']
      },
      testApi: {
        options: {
          reporter: 'spec'
        },
        src: ['test/api/**/*.js']
      }
    }

  });

  grunt.registerTask('server', ['express:dev', 'watch']);
  grunt.registerTask('test', ['env:test', 'mochaTest:testUnit']);
  grunt.registerTask('api-test', ['env:test', 'mochaTest:testUnit', 'mochaTest:testApi']);

  grunt.registerTask('s', ['server']);
  grunt.registerTask('default', ['api-test']);
};
 