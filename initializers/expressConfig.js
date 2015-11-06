/**
 * Contains config/middleware application to entire application
 */
var serveStatic = require('serve-static')
module.exports = function(app, userRouter) {
    app.use(serveStatic('client'));
    app.use(userRouter);
    //last middelware to catch exceptions thrown by other middlewares/routes
    app.use(function(err, req, res, next) {
        res.status(500).send({
            "error": "server error"
        });
    });
};
