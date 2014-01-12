module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js', 'src/**/*.js', 'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            },
        },
        mocha: {
            test: {
                src: ['test/**/*.html'],
                options: {
                    run: true,
                    log: true
                }
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('default', ['test']);
};
