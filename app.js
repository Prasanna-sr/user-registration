/**
 * Main file of the application.
 * Initializes the application and starts the server.
 */

var express = require('express');
var app = express();

//Initialize the application
var initializers = require('./initializers/initialize')(app, express);


//starts the server
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Express server listening on port : ' + port);
});