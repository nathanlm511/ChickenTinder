const SimulatedDB = require('../_helpers/dbsimulator');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const db = require('../_helpers/database');
const Group = db.Group;



module.exports = {
    joinGroup,
    getAllGroups,
    addGroup,
    getGroup,
    startGroup,
    addRestaurantsToGroup,
    addVote,
    setWinner
}

async function joinGroup({ username, passcode }) {
    if (await Group.findOne({ passcode: passcode })) {
        await Group.updateOne({ passcode: passcode }, {"$push": { "users": username } });
        const group = await Group.findOne({ passcode: passcode });
        return group;
    }
    else {
        return null;

    }

}

async function getAllGroups() {
    return await Group.find({});
}

async function getGroup({ passcode }) {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.

    const group = await Group.findOne({ passcode: passcode });

    return group;
}


async function addGroup(groupParam) {

    if (groupParam.host) {
        newGroup = {
            passcode: Math.floor(100000 + Math.random() * 900000).toString(),
            host: groupParam.host,
            users: [],
            votes: [],
            started: false
        }

        const group = new Group(newGroup);
        await group.save();
        return group;

    }
    else {
        throw 'No host';
    }

}

async function startGroup({ passcode }) {
    if (await Group.findOne({ passcode: passcode })) {
        await Group.updateOne({ passcode: passcode }, {"started": true } );
        const group = await Group.findOne({ passcode: passcode });
        return group;
    }
    else {
        return null;

    }

}

async function addRestaurantsToGroup(passcode, ids, names) {
    let newVotes = [];
    for (let i = 0; i < ids.length; i++) {
        newVotes.push({id: ids[i], name: names[i], numVotes: 0});
    }
    if (await Group.findOne({ passcode: passcode })) {
        await Group.updateOne({ passcode: passcode }, {"votes": newVotes } );
        const group = await Group.findOne({ passcode: passcode });
        return group;
    }
    else {
        return null;

    }
}

async function addVote({ id, passcode }) {
    console.log(passcode);
    if (await Group.findOne({ passcode: passcode })) {
        await Group.updateOne({ passcode: passcode, 'votes.id': id}, {'$inc': {'votes.$.numVotes': 1}});
        const group = await Group.findOne({ passcode: passcode });
        console.log(id);
        return group;
    }
    else {
        return null;
    }
}

async function setWinner({ winner, passcode }) {
    if (await Group.findOne({ passcode: passcode })) {
        await Group.updateOne({ passcode: passcode }, {"winner": winner } );
        const group = await Group.findOne({ passcode: passcode });
        return group;
    }
    else {
        return null;
    }
}

