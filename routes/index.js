var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET About me page. */
router.get('/aboutme', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
/* GET Services page. */
router.get('/services', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });  

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });


module.exports = router;
