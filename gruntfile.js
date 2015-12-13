var port = 8080;
var ngrok = require('ngrok');

//Project images sizes
var projectImageSizes = [{
  width: 358,
  height: 190,
  aspectRatio: false
}, {
  width: 259,
  height: 150,
  aspectRatio: false
}, {
  width: 333,
  height: 190,
  aspectRatio: false
}, {
  width: 690,
  height: 421,
  aspectRatio: false
}, {
  width: 273,
  height: 161,
  aspectRatio: false
}];

//Main images sizes
var mainImageSizes = [{
  width: 1134,
  height: 500,
  aspectRatio: false
}, {
  width: 836,
  height: 450,
  aspectRatio: false
}, {
  width: 696,
  height: 350,
  aspectRatio: false
}];


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
          'views/pizza.html': ['pizza.src.html']
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
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'index.html',
          'views/pizza.html': 'views/pizza.html'
        }
      }
    },

    // Create responsive images
    responsive_images: {
      dev_project: {
        options: {
          sizes: projectImageSizes
        },
        files: [{
          expand: true,
          src: ['*.{jpg,gif,png}'],
          cwd: 'img',
          dest: 'img/prod'
        }]
      },

      dev_main: {
        options: {
          sizes: mainImageSizes
        },
        files: [{
          expand: true,
          src: ['*.{jpg,gif,png}'],
          cwd: 'views/images',
          dest: 'views/images/prod'
        }]
      }
    },

    // Minify images
    imagemin: {
      target1: {
        files: [{
          expand: true,
          cwd: 'img/prod',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/prod'
        }]
      },
      target2: {
        files: [{
          expand: true,
          cwd: 'views/images/prod',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'views/images/prod'
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

  grunt.registerTask('default', ['uglify', 'cssmin', 'processhtml', 'htmlmin']);
};