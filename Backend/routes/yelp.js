var express = require('express');
var router = express.Router();
const yelpController = require('../controllers/yelp.controller');

router.post('/getIds', yelpController.getYelpIds);
router.post('/getInfo', yelpController.getYelpInfo);

module.exports = router;
