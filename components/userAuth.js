/**
 * Handles hashing for authentication
 */
var crypto = require('crypto');

//Implements hmac authentication
function UserAuth(db) {
    var encoding = 'base64';
    var hashAlgorithm = 'sha1';
    var secretKey = 'userkey';
    var userAuth = {};
    var collection = db.collection('users');

    userAuth.getHash = getHash;
    userAuth.verifyHash = verifyHash;
    userAuth.ensureAuthenticated = ensureAuthenticated;

    return userAuth;

    function getHash(data) {
        var hmacObj = crypto.createHmac(hashAlgorithm, secretKey);
        hmacObj.update(data);
        return hmacObj.digest([encoding]);
    };

    function verifyHash(data, hash) {
        var hmacObj = crypto.createHmac(hashAlgorithm, secretKey);
        hmacObj.update(data);
        return hmacObj.digest([encoding]) === hash;
    };

    function ensureAuthenticated(req, res, next) {
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
}

module.exports = UserAuth;