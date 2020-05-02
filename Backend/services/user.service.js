const SimulatedDB = require('../_helpers/dbsimulator');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const bcrypt = require('bcryptjs');

const db = require('../_helpers/database');
const User = db.User;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    return await User.find().select('-hash');
}



async function getByUsername(username) {
    return await SimulatedDB.findUser(username);
}

async function addUser(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        return null;
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    console.log(user);

    // save user
    await user.save();

    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);

    return {
        ...userWithoutHash,
        token
    };

}

