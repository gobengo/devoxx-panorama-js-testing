// config
var PORT = 8000;

// deps
var express = require('express');
var engine = require('ejs-locals');

var app = express();
app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes

app.get('/', function(req, res) {
    res.render('cat', { title: 'Space Chatons' });
});

var server = app.listen(PORT);

/*
// socket-io
var socket = require('socket.io');
var io = socket.listen(server);
*/

// let's rock
console.log("Application started on port : " + PORT);