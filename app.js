
/**
 * Module dependencies.
 */
var express = require('express');
var ctrlEcommerce = require("./controllers/ecommerce");
var ctrlAccount = require("./controllers/account");
var ctrlManagement = require("./controllers/management");
var svcDatabase = require("./services/database");
var svcAuth = require("./services/account/auth.js");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));
app.use(express.bodyParser());
ctrlAccount.init(app);
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
var dbName = 'Ecommerce';

mongodb_connection_string = 'mongodb://localhost/' + dbName;

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

ctrlEcommerce.init(app);
svcDatabase.init(app);
ctrlManagement.init(app,__dirname);
//svcAuth.registerAdmin();

app.use(function(req, res) {
    res.redirect("/");
});



server.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", server_port " + port)
});

/*
http.createServer(app).listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});*/
