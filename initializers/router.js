var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

module.exports = function(userRouter, userObj, userAuth) {

    userRouter.post('/login', function(req, res, next) {
        res.send('test');
    });
    userRouter.post('/logout', function(req, res, next) {
        res.send('test');
    });

    userRouter.use(cookieParser());

    userRouter.get('/user', userAuth.ensureAuthenticated, userObj.getUsers);
    //userRouter.get('/user', userObj.getUsers);

    userRouter.use(bodyParser.json());

    userRouter.post('/user', userObj.signup);


};
