/**
 * Handles hashing for authentication
 */
var crypto = require('crypto');

//Implements hmac authentication
module.exports = function(db) {
    var encoding = 'base64';
    var hashAlgorithm = 'sha1';
    var secretKey = 'userkey';
    var userAuth = {};
    var collection = db.collection('users');

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
        var emailId;
        if (req.cookies && req.cookies.token && req.cookies.id) {
            token = req.cookies.token;
            emailId = req.cookies.id;
        }
        if (!token || !emailId) {
            res.status(401).send({
                "error": "User not authorized"
            });
            return;
        }
        getPassword(emailId, function(err, results) {
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


    function getPassword(emailId, callback) {
        collection.find({
            'emailId': emailId
        }).toArray(function(err, result) {
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    }

    return userAuth;
};
