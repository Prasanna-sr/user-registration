var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
/**
* Express Router, handles all user entity related routes and middleware
*/
module.exports = function(userRouter, userControllerObj, userAuth) {

    userRouter.post('/login', userControllerObj.login);
    userRouter.post('/logout', userControllerObj.logout);

    userRouter.use(cookieParser());

    userRouter.get('/user', userAuth.ensureAuthenticated, userControllerObj.getUsers);
    //userRouter.get('/user', userControllerObj.getUsers);

    userRouter.use(bodyParser.json());

    userRouter.post('/user', userControllerObj.signup);


};
