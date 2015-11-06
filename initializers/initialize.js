/**
 * Initialize all the components of the application.
 * Also works as a dependency injection.
 */
var userModels = require('./../models/userModels');
var routes = require('./routes');
var expressConfig = require('./expressConfig');
var mondoDb = require('./../components/mongoConnection')();
var userController = require('./../controllers/usersController');
var userAuth = require('./../components/userAuth');

function Initialize(app, express) {
    var usersRouter = express.Router();
    //components
    mondoDb.connect(function(err, db) {
        var userAuthObj = userAuth(db);
        //models
        var userModelObj = userModels(db);

        //controllers
        var userObj = userController(userModelObj, userAuthObj);
        routes(usersRouter, userObj, userAuthObj);
        expressConfig(app, usersRouter);
    });
}

module.exports = Initialize;