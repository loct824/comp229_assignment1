const { requestLogin } = require('../controller/auth.js');

const router = require('express').Router();
businessController = require('../controller/business.js');

router.use(requestLogin);

//GET ROUTE for the business contacts list page -- READ Operation
router.get('/', businessController.displayBusinessContacts);

/*GET Route for displaying the Add Page- CREATE Operation*/
router.get('/add',businessController.displayBusinessAddPage);

/*POST Route for processing the Add page - CREATE Operation*/

router.post('/add',businessController.postBusinessAddPage);

/*GET Route for displaying the Edit page - UPDATE Operation*/
router.get('/edit/:id',businessController.displayBusinessEditPage);

/*POST Route for processing the Edit page - UPDATE Operation*/
router.post('/edit/:id',businessController.postBusinessEditPage);

/*GET to perform deletion - DELETE Operation*/
router.get('/delete/:id',businessController.deleteBusinessContact);

module.exports= router;