var
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    //favicon = require('serve-favicon'),
    logger = require('morgan'),
    path = require('path');
    //passport = require('passport'),
    //session = require('express-session');


module.exports = function (app, config) {
    app.set('views', path.join(config.rootPath, 'server/views'));
    app.set('view engine', 'twig');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(config.rootPath, 'public', 'favicon.ico')));
    app.use(logger(config.env));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    //app.use(require('less-middleware')(path.join(config.rootPath, 'public')));
    app.use(express.static(path.join(config.rootPath, 'public', config.env)));
    //app.use(session({secret: 'super secret', resave: false, saveUninitialized: false}));
    //app.use(passport.initialize());
    //app.use(passport.session());
};
