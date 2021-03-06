var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', userController.getAllUsers);

module.exports = router;
