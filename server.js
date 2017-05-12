var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();
//using mlab.com to create the link to connect the database
mongoose.connect('mongodb://root:Ca12345678@ds139791.mlab.com:39791/ecommerceclone', function(err) {
    if (err) { 
        console.log(err)
    } else {
        console.log("Connected to the database.")
    }
})
//Middleware

app.use(morgan('dev'));


app.get('/', function(req, res) {
    res.status(200).json("Success Claudio, server is up and running")
})
app.listen(3000, function(err) {
    if (err) throw err;
    console.log("Server is Running in port 3000");
});