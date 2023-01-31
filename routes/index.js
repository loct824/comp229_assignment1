var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Home' });
});

/* GET About me page. */
router.get('/aboutme', function(req, res, next) {
    res.render('aboutme', { title: 'About' });
  });

/* GET resume */
router.get('/resume', function(req, res, next){
    res.download('./public/content/Ivan_Lo_resume.pdf', function(err){
        console.log("Error:",err);
    })
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects' });
  });
  
/* GET Services page. */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
  });  

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
  });

module.exports = router;
