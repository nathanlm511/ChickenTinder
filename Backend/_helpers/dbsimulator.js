module.exports = {
    findUser,
    addUser,
    getAllUsers
}

let Users = [{
    username: "admin",
    role: "Admin",
    password:"123123"},
    {username: "user",
        role: "User",
        password:"123123"}

];

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
