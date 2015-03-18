module.exports = function(app, express) {
    var usersRouter = express.Router();
    var expressConfig = require('./expressConfig');
    var router = require('./router');
    router(usersRouter);
    expressConfig(app, usersRouter);

};
