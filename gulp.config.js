module.exports = function() {
    var bowerRoot = './public/dev/bower_components';
    var bower = {
        cssFiles: [
            bowerRoot+'/bootstrap/dist/css/*.min.css',
            bowerRoot+'/font-awesome/css/font-awesome.min.css'
        ],
        jsFiles: [
            bowerRoot+'/jquery/dist/jquery.min.js',
            bowerRoot+'/jquery-ui/jquery-ui.min.js',
            bowerRoot+'/bootstrap/dist/js/bootstrap.min.js',
            bowerRoot+'/angular/angular.min.js',
            bowerRoot+'/angular-bootstrap/ui-bootstrap-tpls.min.js',
            bowerRoot+'/angular-ui-router/release/angular-ui-router.min.js',
            bowerRoot+'/angular-ui-sortable/sortable.min.js',
            bowerRoot+'/angular-smart-table/dist/smart-table.min.js',
            bowerRoot+'/highcharts/highcharts.js',
            bowerRoot+'/lodash/dist/lodash.js'
        ]
    };

    var inject = {
        target: 'server/views/base.html',
        dest: 'server/views',
        devFileName: 'dev.html',
        prodFileName: 'prod.html'
    };



    var devRoot = './public/dev';
    var dev = {
        root:           devRoot+'',
        //--------------------
        fontFiles:     [bowerRoot+'/font-awesome/fonts/**'],
        htmlFiles:     [devRoot+'/scripts/**/*.html'],
        //--------------------
        stylesDir:      devRoot+'/styles',
        cssFiles:      [devRoot+'/styles/**/*.css'],
        lessFiles:     [devRoot+'/styles/**/*.less'],
        cssFileName:    'styles.css',
        //--------------------
        scriptsDir:     devRoot+'/scripts',
        jsFiles:       [devRoot+'/scripts/**/*.js'],
        tsFiles:       [devRoot+'/scripts/**/*.ts']
    };



    var prodRoot = './public/prod';
    var prod = {
        root:           prodRoot,
        //--------------------
        fontsDir:       prodRoot+'/fonts',
        htmlFiles:      prodRoot+'/scripts',
        //--------------------
        stylesDir:      prodRoot+'/styles',
        cssFiles:      [prodRoot+'/styles/**/*.min.css'],
        cssFileName:    'styles.css',
        cssFileNameMin: 'styles.min.css',
        //--------------------
        scriptsDir:     prodRoot+'/scripts',
        jsFiles:       [prodRoot+'/scripts/**/*.min.js'],
        jsFileName:     'scripts.js',
        jsFileNameMin:  'scripts.min.js'
    };




    var config = {
        dev: {
            dir: dev.root,
            clean: Array.prototype.concat(
                dev.cssFiles,
                dev.jsFiles
            ),
            compile: {
                less: {
                    src: dev.lessFiles,
                    dest: dev.stylesDir,
                    fileName: dev.cssFileName
                },
                ts: {
                    src: dev.tsFiles,
                    dest: dev.scriptsDir
                }
            },
            inject: {
                src: Array.prototype.concat(
                    bower.cssFiles,
                    bower.jsFiles,
                    dev.cssFiles,
                    dev.jsFiles
                ),
                target: inject.target,
                dest: inject.dest,
                filename: inject.devFileName
            }
        },
        prod: {
            dir: prod.root,
            clean: prod.root,
            copy: {
                fonts: {
                    src: dev.fontFiles,
                    dest: prod.fontsDir
                },
                html: {
                    src: dev.htmlFiles,
                    dest: prod.htmlFiles
                }
            },
            css: {
                src: Array.prototype.concat(bower.cssFiles, dev.cssFiles),
                dest: prod.stylesDir,
                fileName: prod.cssFileName,
                fileNameMin: prod.cssFileNameMin
            },
            js: {
                src: Array.prototype.concat(bower.jsFiles, dev.jsFiles),
                dest: prod.scriptsDir,
                fileName: prod.jsFileName,
                fileNameMin: prod.jsFileNameMin
            },
            inject: {
                src: Array.prototype.concat(prod.cssFiles, prod.jsFiles),
                target: inject.target,
                dest: inject.dest,
                fileName: inject.prodFileName
            }
        }
    };

    return config;
};
