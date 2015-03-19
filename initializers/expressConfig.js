/**
 * Contains config/middleware application to entire application
 */
module.exports = function(app, userRouter) {
    app.use(userRouter);
    //last middelware to catch exceptions thrown by other middlewares/routes
    app.use(err, req, res, next) {
        console.log(err);
        res.status(500).send({
            "error": "server error"
        });
    }
};
