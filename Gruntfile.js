 module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9001,
                    index: 'index.html',
                    livereload: true
                }
            }
        },

        sass: {
            options: {
                loadPath: ['node_modules/foundation-sites/scss']
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
                files: ["stylesheets/scss/**/*.scss"],
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
                    'node_modules/foundation-sites/dist/js/foundation.js',
                    'node_modules/foundation-sites/js/foundation.util.keyboard.js',
                    'node_modules/foundation-sites/js/foundation.util.timerAndImageLoader.js',
                    'node_modules/foundation-sites/js/foundation.tabs.js',
                    'js/develop/script.js'
                ],
                dest: 'js/assets/script.js'
            },

            modernizr: {
                src: [
                    'node_modules/foundation-sites/vendor/modernizr/modernizr.js',
                    'js/develop/custom.modernizr.js'
                ],
                dest: 'js/assets/modernizr.js'
              }
            },

            // sprite:{
            //   all: {
            //     src: 'images/icons/*.png',
            //     dest: 'images/icons/sprites/spritesheet.png',
            //     destCss: 'stylesheets/scss/partials/components/_sprites.scss',
            //     imgPath: '../../images/icons/sprites/spritesheet.png', // manually setup default path to sprite
            //     padding: 2
            //   }
            // },

        // --------------------------------------
        // Uglify Configuration
        // --------------------------------------

        uglify: {
            dist: {
                files: {
                    'js/assets/jquery.min.js': ['node_modules/foundation-sites/vendor/jquery/dist/jquery.js'],
                    'js/assets/modernizr.min.js': ['js/assets/modernizr.js']
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-spritesmith');


    // -----------------------------------------
    // Register Grunt tasks
    // -----------------------------------------

    grunt.registerTask('buildCss', ['sass']);
    grunt.registerTask('buildJs', ['concat', 'uglify']);
    grunt.registerTask('default', ['connect', 'buildCss', 'buildJs', 'watch']);
};