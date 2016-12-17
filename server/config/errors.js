
module.exports = function(app, config) {
    //404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    //error handler
    app.use(function(err, req, res, next) {
        var status = err.status || 500;

        res.locals.status = status;
        res.locals.message = err.message;
        res.locals.error = config.env === 'dev' ? err : {};

        console.error('\n', req.method, req.originalUrl, '\n', err);
        res.status(status);
        req.xhr ? res.send('ERROR: '+res.locals.message) : res.render('error');
    });
};
