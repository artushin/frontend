'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkgConfig,

        less: {
            development: {
                options: {
                    rootpath: "../",
                    compress: true,
                    relativeUrls: true
                }
            }
        },

        webpack: {
            options: webpackDistConfig,
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: './<%= pkg.src %>/'
            },

            start: {
                keepAlive: true
            }
        },

        connect: {
            options: {
                port: 8000
            },

            dist: {
                options: {
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, pkgConfig.dist)
                        ];
                    }
                }
            }
        },

        open: {
            options: {
                delay: 500
            },
            dev: {
                path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
            },
            dist: {
                path: 'http://localhost:<%= connect.options.port %>/'
            }
        },

        copy: {
            index: {
                files: [
                    // includes files within path
                    {
                        src: ['<%= pkg.src %>/index.html.ejs'],
                        dest: '<%= pkg.dist %>/index.html'
                    }
                ],
                options: {
                    process: function (content, path) {
                        return grunt.template.process(content);
                    }
                }
            },
            dev: {
                files: [
                    // includes files within path
                    {
                        src: ['<%= pkg.src %>/index.html.ejs'],
                        dest: '<%= pkg.src %>/index.html'
                    }
                ],
                options: {
                    process: function (content, path) {
                        return grunt.template.process(content);
                    }
                }
            },
            dist: {
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/*!<%= pkg.src %>/index.html*'],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/images/*'],
                        dest: '<%= pkg.dist %>/images/'
                    }
                ]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>/assets'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:dist', 'connect:dist']);
        }

        grunt.task.run([
            'open:dev',
            'copy:dev',
            'webpack-dev-server'
        ]);
    });

    grunt.registerTask('build', ['clean', 'copy:index', 'copy:dist', 'webpack']);

    grunt.registerTask('default', ['serve']);
};
