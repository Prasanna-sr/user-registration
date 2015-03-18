module.exports = function(app, express) {
	var expressConfig = require('./expressConfig');
	var router = require('./router');
    var usersRouter = express.Router();   

    //initialize components
    var mysqlConnection = require('./../components/mysql')();
    var userAuth = require('./../components/userAuth')(mysqlConnection);

    //initialize models
    var userModels = require('./../models/userModels')(mysqlConnection);

    //initialize controllers
    var userObj = require('./../controllers/usersController')(userModels, userAuth);

    router(usersRouter, userObj, userAuth);
    expressConfig(app, usersRouter);
};