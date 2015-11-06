var sinon = require('sinon');
var assert = require('assert');

var userController = require('./../controllers/usersController');

//mock userModels
var userModels = {};
userModels.getUser = function(email, callback) {
    callback(null, {
        password: 1
    });
};
userModels.signup = function(email, password, name, city, callback) {
    callback(null, {});
};

var userAuth = {};
userAuth.getHash = sinon.spy();

var userControllerObj = userController(userModels, userAuth);

describe('user controllers', function() {
    var req = {};
    var res = {};
    beforeEach(function() {
        req.body = {};
        req.query = {};
        res.cookie = sinon.spy();
        var obj = {};
        obj.send = sinon.spy();
        res.status = sinon.stub().returns(obj);
    });

    describe('login', function() {
        it('should return 200 for valid users', function() {
            req.body.emailid = 1;
            req.body.password = 1;
            userControllerObj.login(req, res);
            assert(res.status.calledWith(200));
        });
        it('should return 400 if emailid or password not passed', function() {
            req.body.emailid = 1;
            userControllerObj.login(req, res);
            assert(res.status.calledWith(400));
        });
        it('should return 500 if error in fetching user details', function() {
            userModels.getUser = function(email, callback) {
                callback("err");
            };
            req.body.password = 1;
            req.body.emailid = 1;
            userControllerObj.login(req, res);
            assert(res.status.calledWith(500));
        });
    });

    describe('logout', function() {
        res.clearCookie = sinon.spy();
        it('should return 200', function() {
            userControllerObj.logout(req, res);
            assert(res.status.calledWith(200));
        });
        it('should clear cookie id', function() {
            userControllerObj.logout(req, res);
            assert(res.clearCookie.calledWith('id'));
        });
        it('should clear cookie', function() {
            userControllerObj.logout(req, res);
            assert(res.clearCookie.calledWith('token'));
        });
    });


    describe('signup', function() {
        it('should return 201', function() {
            req.body.emailid = 1;
            req.body.password = 1;
            userControllerObj.signup(req, res);
            assert(res.status.calledWith(201));
        });
        it('should return 400 when emailid, password not passed', function() {
            userControllerObj.signup(req, res);
            assert(res.status.calledWith(400));
        });
        it('should return 400 when emailid already exists', function() {
            req.body.emailid = 1;
            req.body.password = 1;
            userModels.signup = function(email, password, name, city, callback) {
                callback(null, {
                    duplicate: 1
                });
            };
            userControllerObj.signup(req, res);
            assert(res.status.calledWith(400));
        });
        it('should return 500 if error in posting user details', function() {
            userModels.signup = function(email, password, name, city, callback) {
                callback("err");
            };
            req.body.password = 1;
            req.body.emailid = 1;
            userControllerObj.signup(req, res);
            assert(res.status.calledWith(500));
        });
    });

    describe('getUsers', function() {
        it('should return 200', function() {
        	userModels.getUser = function(email, callback) {
            callback(null, {
                password: 1
            });
        };
            req.query.emailid = 1;
            userControllerObj.getUserDetails(req, res);
            assert(res.status.calledWith(200));
        });
        it('should return 400, if no emailid', function() {
            req.query.emailid = 0;
            userControllerObj.getUserDetails(req, res);
            assert(res.status.calledWith(400));
        });
        it('should return 500, if error in fetching user details', function() {
            userModels.getUser = function(email, callback) {
                callback("err");
            };
            req.query.emailid = 1;
            userControllerObj.getUserDetails(req, res);
            assert(res.status.calledWith(500));
        });
    });
});
