var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res, next) {
    res.render('../views/accounts/signup');
});

router.post('/signup', function(req,res, next) {
    // The variable below calls the user schema to fill it in w/ bodyParser
    var user = new User();
    // Here we are filling in the schema fields by posting content onto the server and the schema saves it 
    // by setting the schema fields to be the requested fields, we use bodyParser to be able to use the JSON it creates.
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({ email: req.body.email }, function(err, existingUser) {

        if (existingUser) {
            console.log( req.body.email + " is already taken.");
            return res.redirect('/signup');
        } else {
            user.save(function(err, user) {
                if (err) return next(err);
                
                res.json("New user created");
            });
        }
    });
});

module.exports = router;