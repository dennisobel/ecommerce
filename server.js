// Dependencies
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');
var app = express();
var ejs = require('ejs');
var ejsMate = require('ejs-mate');


//using mlab.com to create the link to connect the database
mongoose.connect('mongodb://root:Ca12345678@ds139791.mlab.com:39791/ecommerceclone', function(err) {
    if (err) { 
        console.log(err)
    } else {
        console.log("Connected to the database.")
    }
});

//Middleware
app.use(express.static(__dirname + '/public')); //express can surf static files
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(userRoutes);
app.use(mainRoutes);
//Routes




//Server load
app.listen(3000, function(err) {
    if (err) throw err;
    console.log("Server is Running in port 3000");
});