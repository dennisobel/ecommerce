var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('main/home');
    //res.status(200).json("Success Claudio, server is up and running")
});

router.get('/about', function(req,res) {
    res.render('main/about');
});

module.exports = router;