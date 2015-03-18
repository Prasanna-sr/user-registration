var mysql = require('mysql');
var connection;

module.exports = function() {
    var db_config = {
            host: '127.0.0.1',
            database: 'test',
            multipleStatements: true
        };

        connection = mysql.createPool(db_config);
        
        connection.getConnection(function(err) {
            if (err) {
                console.log('error connecting: ' + err.stack);
                return;
            }
        });
    

    return connection;
};


