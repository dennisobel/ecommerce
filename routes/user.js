var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConfig = require('../config/passport');



router.get('/login', function(req,res) {
    if (req.user) return res.redirect('/');
    res.render('accounts/login', { message: req.flash('loginMessage') });
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failuerFlash: true
}));

router.get('/profile', function(req, res, next) {
    User.findOne({ _id: req.user._id }, function(err, user) {
        if (err) return next(err);

        res.render('accounts/profile', { user: user });
    });
});

router.get('/signup', function(req, res, next) {
    res.render('../views/accounts/signup', {
        errors: req.flash('errors')
    });
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
            req.flash('errors', 'An account with that email already exists');
            return res.redirect('/signup');
        } else {
            user.save(function(err, user) {
                if (err) return next(err);
                
                return res.redirect('/');
            });
        }
    });
});

module.exports = router;