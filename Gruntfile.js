'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    browserify: {
      js: {
        src: 'app/app.js',
        dest: 'app/bundle.js',
      },
    },
    ngAnnotate: {
        options: {
          singleQuotes: true
        },
        styleApp: {
          files: {
            'app/bundle.annotate.js': ['app/bundle.js']
          }
        },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'app/bundle.annotate.js',
        dest: 'dist/app/app.min.js'
      },
    },
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'app/style/style.css': 'app/style/style.scss'
            }
        }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/style/style.min.css': ['app/style/style.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'app',
        src: ['**/*.html', '*.html', '**/*.handlebars'],
        dest: 'dist/'
      }
    },
    image: {
        dynamic: {
            files: [{
                expand: true,
                //cwd: 'assets/',
                src: ['assets/imgs/**/*.{png,jpg,gif,svg}'],
                dest: 'dist/'
            }]
        }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['assets/fonts/**/*'], dest: 'dist/'}
        ]
      }
    },
    watch: {
      scripts: {
        files: ['app/*.js', 'app/**/*.js', '!app/bundle.*'],
        tasks: ['browserify', 'ngAnnotate', 'uglify'],
        options: {
          interrupt: true,
        },
      },
      css: {
        files: 'app/style/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true,
        },
      },
      configFiles: {
        files: [ 'app/**/*.html', 'app/**/*.handlebars' ],
        tasks: ['htmlmin'],
        options: {
          reload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-sass');

  // Default task.
  grunt.registerTask('default', ['browserify', 'ngAnnotate', 'uglify', 'sass', 'cssmin', 'htmlmin', 'copy', 'watch']);
  grunt.registerTask('images', [ 'image' ]);
};
