/**
* Initialize all the components of the application.
* Also works as a dependency injection.
*/
module.exports = function(app, express) {
	var expressConfig = require('./expressConfig');
	var router = require('./router');
    var usersRouter = express.Router();   

    //components
    var mysqlConnection = require('./../components/mysql')();
    var userAuth = require('./../components/userAuth')(mysqlConnection);

    //models
    var userModels = require('./../models/userModels')(mysqlConnection);

    //controllers
    var userObj = require('./../controllers/usersController')(userModels, userAuth);

    router(usersRouter, userObj, userAuth);
    expressConfig(app, usersRouter);
};