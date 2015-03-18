module.exports = function(userModels) {
    var userObj = {};
    userObj.signup = function(req, res, next) {
        var userObj = req.body;
        if (userObj && userObj.emailid && userObj.password) {
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
                            res.status(200).send({
                                "message": "success"
                            });
                        }
                    } else {
                        res.status(500).send({
                            "error": "server error"
                        });
                    }

                });
        } else {
            res.status(400).send({
                "error": "userid, password is required !"
            });
        }

    };
    return userObj;
};
