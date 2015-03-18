module.exports = function(userModels, userAuth) {
    var userObj = {};
    userObj.signup = function(req, res, next) {
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
                    if (result.duplicate) {
                        res.status(400).send({
                            "message": "emailid already existing"
                        });
                    } else {
                        var token = userAuth.getHash(userObj.password);
                        res.header('id', userObj.emailid);
                        res.header('token', token);
                        res.status(201).send({
                            "message": "success"
                        });
                    }
                } else {
                    res.status(500).send({
                        "error": "server error"
                    });
                }

            });
    };
    userObj.getUsers = function(req, res, next) {
        var emailID = req.query.emailid;
        if (!emailID) {
            res.status(400).send({
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
    };

    return userObj;
};
