/**
 * User Models - User related database calls are handled
 */
function UserModels(db) {
    var collection = db.collection('users');

    var userModelObj = {};
    userModelObj.signup = signup;
    userModelObj.getUser = getUser;
    userModelObj.getUsers = getUsers;
    return userModelObj;

    function signup(email, password, name, city, callback) {
        var userObj = {
            emailId: email,
            password: password,
            name: name,
            city: city
        }
        collection.insertOne(userObj, function(err, result) {
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    }

    function getUser(email, callback) {
        collection.find({
            'emailId': email
        }).toArray(function(err, result) {

            if (!err) {
                callback(null, result[0]);
            } else {
                callback(err);
            }
        });
    }

    function getUsers(callback) {
        collection.find({}).toArray(function(err, result) {
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    }

}

module.exports = UserModels;