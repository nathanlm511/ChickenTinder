var express = require('express');
var router = express.Router();
const groupController = require('../controllers/group.controller');

router.post('/joingroup', groupController.joinGroup);
router.post('/addgroup', groupController.createGroup);
router.get('/allgroups', groupController.getAllGroups);
router.get('/getgroup', groupController.getGroup);

module.exports = router;
