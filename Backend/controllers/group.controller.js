const groupService = require('../services/group.service')


module.exports = {
    createGroup,
    getAllGroups,
    joinGroup,
    getGroup
};


function joinGroup(req, res, next) {

    groupService.joinGroup(req.body)
        .then(user => user ? res.json(user) : res.status(299).json({ message: 'Incorrect Passcode' }))
        .catch(err => next(err));
}

function getAllGroups(req, res, next) {
    //  console.log("getAll", req.body);
    groupService.getAllGroups()
        .then(groups => res.json(groups))
        .catch(err => next(err));
}

function getGroup(req, res, next) {
    //  console.log("getAll", req.body);
    groupService.getGroup(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}

function createGroup(req, res, next) {

    groupService.addGroup(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}
