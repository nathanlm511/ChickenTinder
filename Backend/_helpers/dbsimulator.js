module.exports = {
    findUser,
    addUser,
    getAllUsers,
    getAllGroups,
    addGroup,
    findGroup,
    addToGroup
}

let Users = [{
    username: "admin",
    role: "Admin",
    password:"123123"},
    {username: "user",
        role: "User",
        password:"123123"}

];

let Groups = [{
    passcode: "123456",
    host: "host",
    users: ["nathan", "may", "chaitanya"],
    votes: [{"McDonalds": 1}, {"Chipotle": 2}],
    started: false
}]

async function getAllGroups(){
    return new Promise((resolve, reject) => {
        if (Groups.length>0) {
            setTimeout(()=>{
                resolve(Groups);
            },10);
        }
        else
            reject(false);
    });
}

async function addGroup(group){
    console.log("DB: AddGroup()", group);
    return new Promise((resolve, reject) => {

        if (group.host) {
            setTimeout(()=>{

                newGroup = {
                    passcode: Math.floor(100000 + Math.random() * 900000).toString(),
                    host: group.host,
                    users: [],
                    votes: [],
                    started: false
                }

                Groups.push(newGroup);
                resolve(newGroup);
            },10)
        }
        else
            reject(false);
    });
}

async function findGroup(passcode){
    return new Promise((resolve) => {
        const index = Groups.map(group => group.passcode).indexOf(passcode);
        console.log("Find group", index);
        if (index!=-1) {
            setTimeout(()=>{
                resolve(Groups[index]);
            },10);        }
        else
            resolve(null);
    });
}

async function addToGroup(username, passcode) {
    return new Promise((resolve) => {
        const index = Groups.map(group => group.passcode).indexOf(passcode);
        console.log("Find group", index);
        if (index!=-1) {
            setTimeout(()=>{
                Groups[index].users.push(username)
                resolve(Groups[index]);
            },10);        }
        else
            resolve(null);
    });
}

async function findUser(username){
    return new Promise((resolve) => {
        const index = Users.map(user => user.username).indexOf(username);
        console.log("Find user", index);
        if (index!=-1) {
            setTimeout(()=>{
                resolve(Users[index]);
            },10);        }
        else
            resolve(null);
    });
}

async function getAllUsers(){
    return new Promise((resolve, reject) => {
        if (Users.length>0) {
            setTimeout(()=>{
                resolve(Users);
            },10);
        }
        else
            reject(false);
    });
}

async function addUser(user){

    console.log("DB: AddUser()", user);
    return new Promise((resolve, reject) => {

        if (user.username && user.role) {
            setTimeout(()=>{

                Users.push(user);
                resolve(user);
            },10)
        }
        else
            reject(false);
    });
}
