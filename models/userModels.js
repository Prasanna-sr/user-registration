/**
 * User Models - User related database calls are handled
 */
module.exports = function(db) {
    var userModelObj = {};
    var collection = db.collection('users');

    userModelObj.signup = function(email, password, name, city, callback) {
        var userObj = {
            emailId: email,
            password: password,
            name: name,
            city: city
        }
        collection.insertOne(userObj, function(err, result) {
            console.log(result);
            console.log(err);
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    };
    userModelObj.getUser = function(email, callback) {
        collection.find({
            'emailId': email
        }).toArray(function(err, result) {

            if (!err) {
                console.log(result)
                callback(null, result[0]);
            } else {
                callback(err);
            }
        });
    }
    userModelObj.getUsers = function(callback) {
        collection.find({}).toArray(function(err, result) {
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    }
    return userModelObj;
};
