// Dependencies
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');


var secret = require('./config/secret');
var User = require('./models/user');

var app = express();

//using mlab.com to create the link to connect the database
mongoose.connect(secret.database, function(err) {
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
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({ url: secret.database, autoReconnect: true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(userRoutes);
app.use(mainRoutes);
//Routes




//Server load
app.listen(secret.port, function(err) {
    if (err) throw err;
    console.log("The magic happens in port " + secret.port);
});