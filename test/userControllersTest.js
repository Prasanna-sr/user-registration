var userController = require('./../controllers/usersControllers');
//mock userModels
var userModels = {};
userModels.getUser = function(email, callback) {
	callback(null, {
		password: 1
	});
};
userModels.signup = function(email, password,name,city, callback) {
	callback(null);
}

var userControllerObj = userController(userModels);
describe('user controllers', function() {
	var req = {};
	var res = {};

	beforeEach(function() {
		req.body = {};
		res.
	});
    describe('login', function() {
    	req.body.emailid = 1;
    	req.body.password = 1;
        it('should give 200 for valid users', function() {
        	userControllerObj.login(req, res);
        });
    });
});
