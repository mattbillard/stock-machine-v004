
module.exports = function(app, config) {
    //404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    //error handler
    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = config.env === 'dev' ? err : {};

        res.status(err.status || 500);
        res.render('error');
    });
};
