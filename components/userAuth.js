/**
 * Handles hashing for authentication
 */
var crypto = require('crypto');

//Implements hmac authentication
module.exports = function(connection) {
    var encoding = 'base64';
    var hashAlgorithm = 'sha1';
    var secretKey = 'userkey';
    var userAuth = {};

    userAuth.getHash = function(data) {
        var hmacObj = crypto.createHmac(hashAlgorithm, secretKey);
        hmacObj.update(data);
        return hmacObj.digest([encoding]);
    };

    userAuth.verifyHash = function(data, hash) {
        var hmacObj = crypto.createHmac(hashAlgorithm, secretKey);
        hmacObj.update(data);
        return hmacObj.digest([encoding]) === hash;
    };

    userAuth.ensureAuthenticated = function(req, res, next) {
        var token;
        var emailID;
        if (req.cookies && req.cookies.token && req.cookies.id) {
            token = req.cookies.token;
            emailID = req.cookies.id;
        }
        if (!token || !emailID) {
            res.status(401).send({
                "error": "User not authorized"
            });
            return;
        }
        getPassword(emailID, function(err, results) {
            if (err) {
                next(err);
            } else {
                if (results && results[0] && userAuth.verifyHash(results[0].password, token)) {
                    next();
                } else {
                    res.status(401).send({
                        "error": "User not authorized"
                    });
                    return;
                }
            }
        });
    };


    function getPassword(emailID, callback) {
        var query = 'select password from users where emailID=?';
        connection.query(query, [emailID],
            function(err, results) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            });

    }

    return userAuth;
};
