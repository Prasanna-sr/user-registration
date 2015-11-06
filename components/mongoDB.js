var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

function mongoDbConnection() {
    var mongoObj = {};
    mongoObj.connect = connect;
    return mongoObj;

    function connect(callback) {
        // MongoLab connection URL
        var url = 'mongodb://test:test@ds049754.mongolab.com:49754/prk';
        //local connection
        // var url = 'mongodb://localhost:27017/test';
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            callback(err, db);
        });
    }
}

module.exports = mongoDbConnection;
