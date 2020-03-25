const SimulatedDB = require('../_helpers/dbsimulator');
const jwt = require('jsonwebtoken');
const config = require('../config.json');



module.exports = {
    joinGroup,
    getAllGroups,
    addGroup,
    getGroup
}

async function joinGroup({ username, passcode }) {



    //Here we will switch to  real db in the next HW.
    //Currently simulating it.
    const group = await SimulatedDB.findGroup(passcode);
    //If user is found in the 'database'. In the next homework we will hash the password.
    console.log("service.joinGroup():");
    if (group) {
        return SimulatedDB.addToGroup(username, passcode);
    }
}

async function getAllGroups() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await SimulatedDB.getAllGroups();
}

async function getGroup({ passcode }) {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await SimulatedDB.findGroup(passcode);
}


async function addGroup(group) {

    return SimulatedDB.addGroup(group);

}

