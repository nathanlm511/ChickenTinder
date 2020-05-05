var express = require('express');
var router = express.Router();
const groupController = require('../controllers/group.controller');

router.post('/joingroup', groupController.joinGroup);
router.post('/addgroup', groupController.createGroup);
router.get('/allgroups', groupController.getAllGroups);
router.post('/getgroup', groupController.getGroup);
router.post('/startgroup', groupController.startGroup);
router.post('/addvote', groupController.addVote);
router.post('/setwinner', groupController.setWinner);
router.post('/deletegroup', groupController.deleteGroup);
router.post('/removeuser', groupController.removeUser);

module.exports = router;
