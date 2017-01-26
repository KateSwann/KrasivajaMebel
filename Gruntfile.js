 module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                loadPath: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'stylesheets/scss',
                    src: ['*.scss'],
                    dest: 'stylesheets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            grunt: { 
                files: ["Gruntfile.js"], 
                tasks: ["default"],
                options: {
                  livereload: true
                } 
            },

            sass: {
                files: ["stylesheets/scss/**/*.scss","bower_components/foundation/scss/foundation/*.scss"],
                tasks: ["buildCss"],
                options: {
                  livereload: true
                }
            },
            
            script: {
                files: 'develop/js/**/*.js',
                tasks: ['buildJs'],
                options: {
                  livereload: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },

            script: {
                src: [
                    'bower_components/foundation/js/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.alert.js',
                    'bower_components/foundation/js/foundation/foundation.abide.js',
                    'bower_components/foundation/js/foundation/foundation.joyride.js',
                    'js/develop/script.js'
                ],
                dest: 'js/assets/script.js'
            },

            modernizr: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'js/develop/custom.modernizr.js'
                ],
                dest: 'js/assets/modernizr.js'
            }
        },

        sprite:{
          all: {
            src: 'images/icons/*.png',
            dest: 'images/icons/sprites/spritesheet.png',
            destCss: 'stylesheets/scss/partials/components/_sprites.scss',
            imgPath: '../../images/icons/sprites/spritesheet.png', // manually setup default path to sprite
            padding: 2
          }
        },

        // --------------------------------------
        // Uglify Configuration
        // --------------------------------------

        uglify: {
            dist: {
                files: {
                    'js/assets/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
                    'js/assets/modernizr.min.js': ['js/assets/modernizr.js'],
                    'js/assets/script.min.js': ['js/assets/script.js']
                }
            }
        }
    });

    // -----------------------------------------
    // Load Grunt tasks
    // -----------------------------------------

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-spritesmith');


    // -----------------------------------------
    // Register Grunt tasks
    // -----------------------------------------

    grunt.registerTask('buildCss', ['sass']);
    grunt.registerTask('buildJs', ['concat', 'uglify']);
    grunt.registerTask('default', ['buildCss', 'buildJs', 'watch']);
};