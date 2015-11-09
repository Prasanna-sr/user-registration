/**
 * User controllers - User related endpoints are handled
 */
function userController(userModels, userAuth) {
    var userObj = {};
    userObj.login = login;
    userObj.logout = logout;
    userObj.signup = signup;
    userObj.getUserDetails = getUserDetails;
    userObj.getAllUsers = getAllUsers;
    return userObj;

    function login(req, res, next) {
        var emailID = req.body.emailid;
        var password = req.body.password;
        if (!emailID || !password) {
            res.status(400).send("emailid, password field is required !");
            return;
        }
        userModels.getUser(emailID, function(err, userObj) {
            if (err) {
                res.status(500).send({
                    "error": "server error"
                });
            } else {
                if (userObj && (password === userObj.password)) {
                    var token = userAuth.getHash(userObj.password);
                    res.cookie('id', userObj.emailId);
                    res.cookie('token', token);
                    res.status(201).json({
                        "message": "success"
                    });
                } else {
                    res.status(400).send({
                        "error": "authentication failed"
                    });
                }
            }
        });
    }

    function logout(req, res, next) {
        res.clearCookie('id');
        res.clearCookie('token');
        res.status(200).send({
            "message": "success !"
        });
    }


    function signup(req, res, next) {
        var userObj = req.body;
        if (!userObj || !userObj.emailid || !userObj.password) {
            res.status(400).send({
                "error": "userid, password is required !"
            });
            return;
        }
        userObj.name = userObj.name || null;
        userObj.city = userObj.city || null;
        userModels.signup(userObj.emailid, userObj.password,
            userObj.name, userObj.city,
            function(err, result) {
                if (!err) {
                    var token = userAuth.getHash(userObj.password);
                    res.cookie('id', userObj.emailid);
                    res.cookie('token', token);
                    res.status(201).json({
                        "message": "success"
                    });
                } else {
                    res.status(500).json({
                        "error": "server error"
                    });
                }

            });
    }

    function getUserDetails(req, res, next) {
        var emailID = req.query.emailid || (req.cookies ? req.cookies.id : null);
        if (!emailID) {
            res.status(400).json({
                "message": "emailid is required !"
            });
            return;
        }
        userModels.getUser(emailID, function(err, result) {
            if (err) {
                res.status(500).send({
                    "error": "server error"
                });
            } else {
                res.status(200).send(result);
            }
        });
    }

    function getAllUsers(req, res, next) {
        userModels.getUsers(function(err, result) {
            if (err) {
                res.status(500).send({
                    "error": "server error"
                });
            } else {
                res.status(200).send(result);
            }
        });
    }
}

module.exports = userController;
