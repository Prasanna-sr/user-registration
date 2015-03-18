module.exports = function(app, express) {
	var expressConfig = require('./expressConfig');
	var router = require('./router');
    var usersRouter = express.Router();
    

    //initialize components
    var mysqlConnection = require('./../components/mysql')();

    //initialize models
    var userModels = require('./../models/userModels')(mysqlConnection);

    //initialize controllers
    var userObj = require('./../controllers/usersController')(userModels);

    router(usersRouter, userObj);
    expressConfig(app, usersRouter);
};