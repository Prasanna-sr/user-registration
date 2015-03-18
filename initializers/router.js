module.exports = function(usersRouter) {
    usersRouter.get('/users', function(req, res, next) {
        res.send('test');
    });
};
