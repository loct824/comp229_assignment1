var express = require('express');
var router = express.Router();
let indexController = require('../controller/index.js');

/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* GET About me page. */
router.get('/aboutme', indexController.displayAboutMePage);

/* GET resume */
router.get('/resume', indexController.getResume);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);
  
/* GET Services page. */
router.get('/services', indexController.displayServicesPage);  

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

module.exports = router;
