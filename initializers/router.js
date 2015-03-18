var bodyParser = require('body-parser');
module.exports = function(userRouter, userObj) {

    userRouter.post('/login', function(req, res, next) {
        res.send('test');
    });
    userRouter.post('/logout', function(req, res, next) {
        res.send('test');
    });
    userRouter.get('/user', function(req, res, next) {
        res.send('test');
    });

    userRouter.use(bodyParser.json());

    userRouter.post('/user', userObj.signup);


};
