module.exports = function(connection) {
    var userModelObj = {};
    userModelObj.signup = function(email, password, name, city, callback) {
        var query = 'INSERT INTO users (emailid, password, name, city) ' +
            'VALUES(?, ?, ?, ?)';

        connection.query(query, [email, password, name, city],
            function(err, results) {
                if (!err) {
                    callback(null, results);
                } else if (err && err.code === 'ER_DUP_ENTRY') {
                    callback(null, {
                        duplicate: 1
                    });
                } else {
                    callback(err);
                }
            });
    };
    userModelObj.getUser = function(email, callback) {
        var query = 'select * from users where emailID=?';
        connection.query(query, [email],
            function(err, results) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, results[0]);
                }
            });
    }
    return userModelObj;
};
