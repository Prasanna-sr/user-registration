module.exports = mongoDbConnection;

function mongoDbConnection(callback) {
    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');

    // Connection URL
    var url = 'mongodb://test:test@ds049754.mongolab.com:49754/prk';
    //local connection
    // var url = 'mongodb://localhost:27017/test';

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        callback(err, db);
    });
}
