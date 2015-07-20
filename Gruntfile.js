module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
      src: {
        files: ['src/**/*.js'],
        tasks: ['default'],
      },
      tests: {
        files: ['tests/**/*.js'],
        tasks: ['karma'],
      }
      
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    clean: {
      dist: {
        src: ["angular-canvas.*", 'exif.*', 'megapix-image.*']
      },
      temp: {
        src: ["src/generated"]
      }      
    },
    ngmin: {
      module: {
        src: ['src/ap_canvas_ext.js'],
        dest: 'src/generated/module.js'
      },
      factories: {
        options: {
          separator: '\n',
        },
        src: ['src/helpers/ap_browser_helper.js', 'src/helpers/ap_image_helper.js'],
        dest: 'src/generated/helpers.js'
      },
      directives: {
        src: ['src/directives/*.js'],
        dest: 'src/generated/directives.js'
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['src/generated/module.js', 'src/generated/helpers.js', 'src/generated/directives.js'],
        dest: 'angular-canvas.js',
      },
      exif: {
        src: ['src/libs/binaryajax.js', 'src/libs/exif.js'],
        dest: 'exif.js'
      },
      megapix: {
        src: ['src/libs/megapix-image.js'],
        dest: 'megapix-image.js'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        options: {
          mangle: false
        },
        src: ['angular-canvas.js'],
        dest: 'angular-canvas.min.js'
      },
      exif: {
        src: ['exif.js'],
        dest: 'exif.min.js'
      },
      megapix: {
        src: ['megapix-image.js'],
        dest: 'megapix-image.min.js'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['clean:dist', 'ngmin', 'concat', 'clean:temp', 'uglify']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['build', 'test']);

};