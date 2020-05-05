const groupService = require('../services/group.service')


module.exports = {
    createGroup,
    getAllGroups,
    joinGroup,
    getGroup,
    startGroup,
    addVote,
    setWinner,
    deleteGroup,
    removeUser
};


function joinGroup(req, res, next) {

    groupService.joinGroup(req.body)
        .then(group => res.json(group))
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

function startGroup(req, res, next) {
    groupService.startGroup(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}

function addVote(req, res, next) {
    groupService.addVote(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}

function setWinner(req, res, next) {
    groupService.setWinner(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}

function deleteGroup(req, res, next) {
    groupService.deleteGroup(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}

function removeUser(req, res, next) {
    groupService.removeUser(req.body)
        .then(group => res.json(group))
        .catch(err => next(err));
}
