var port = 8080;
var ngrok = require('ngrok');


module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    

    //Process .html file
    processhtml: {
      dist: {
        options: {
          process: true,
        },
        files: [{
          expand: true,
          cwd: './',
          src: ['*.src.html'],
          dest: './',
          ext: '.html'
        }, ],
      },
      views:{
        files: {
          'views/pizza.html': ['views/pizza.src.html']
        }
      }
    },

    // Uglify .js files
    uglify: {
      build_perfmatters: {
        src: 'js/perfmatters.js',
        dest: 'js/perfmatters.min.js'
      },
      build_main: {
        src: 'views/js/main.js',
        dest: 'views/js/main.min.js'
      }
    },

    // Minify .css files
    cssmin: {
      target1: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      },
      target2: {
        files: [{
          expand: true,
          cwd: 'views/css',
          src: ['*.css', '!*.min.css'],
          dest: 'views/css',
          ext: '.min.css'
        }]
      }
    },
    
    //Minify html files
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'index.html',
          'project-2048.html': 'project-2048.html',
          'project-mobile.html': 'project-mobile.html',
          'project-webperf.html': 'project-webperf.html',
          'views/pizza.html': 'views/pizza.html'
        }
      }
    },

    // Create responsive images
    responsive_images: {
      
      pizzeria_image: {
        options: {
          sizes: [{
            width: 113,
            height: 61,
            aspectRatio: false
          },
          {
            width: 360,
            height: 270,
            aspectRatio: false
          },
          {
            width: 293,
            height: 219,
            aspectRatio: false
          },
          {
            width: 720,
            height: 540,
            aspectRatio: false
          },
          {
            width: 420,
            height: 315,
            aspectRatio: false
          },
          {
            width: 259,
            height: 194,
            aspectRatio: false
          }]
        },
        files: [{
          expand: true,
          src: ['pizzeria.jpg'],
          cwd: 'views/images',
          dest: 'views/images/dist'
        }]
      }

    },

    imagemin: {                          // Task
        dynamic: {                         // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'views/images/dist/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'views/images/dist/'                  // Destination path prefix
          }]
        },
      profile: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img'                  // Destination path prefix
        }]
      }
      }

  });

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['uglify', 'cssmin', 'processhtml', 'htmlmin', 'responsive_images', 'imagemin']);

};