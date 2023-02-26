const router = require('express').Router();

const authController = require('../controller/auth.js');

// Get routes for Login and Registration
router.get('/login',authController.displayLoginPage);

router.get('/register',authController.displayRegisterPage);

router.post('/login', authController.passportAuth,authController.postLogin);

router.post('/register',authController.checkUserExists,authController.postRegister);

router.get('/logout',authController.getLogout);

module.exports = router;