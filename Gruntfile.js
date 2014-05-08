var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            server: {
                options: {
                    port: 3000,
                    hostname: '*',
                    showStack: true,
                    //serverreload: true,
                    server: path.resolve(__dirname, 'app.js')
                }
            }
        },
        watch: {
            server: {
                files: [
                    './*.js',
                    'server/*.js',
                    'routes/*.js',
                    '!server/node_modules'
                ],
                tasks: ['express-restart'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['express']);
    grunt.registerTask('myServer', ['express', 'watch']);

};