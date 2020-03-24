const SimulatedDB = require('../_helpers/dbsimulator');
const jwt = require('jsonwebtoken');
const config = require('../config.json');



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser
}

async function authenticate({ username, password }) {



    //Here we will switch to  real db in the next HW.
    //Currently simulating it.
    const user = await SimulatedDB.findUser(username);
    //If user is found in the 'database'. In the next homework we will hash the password.
    console.log("service.authenticate():", user.password === password);
    if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ sub: user.username, role: user.role }, config.secret);
        console.log("service.authenticate():", token);
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return await SimulatedDB.getAllUsers();
}



async function getByUsername(username) {

    return await SimulatedDB.findUser(username);
}

async function addUser(user) {


    if(await getByUsername(user.username)){
        throw 'Username "' + user.username + '" is already taken';
    }


    return SimulatedDB.addUser(user);

}

