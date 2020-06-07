const dao = require('../dao/CustomerDao');

class CustomerService{
    createUser(user){
        console.log("UserService :: createUser");
        return new Promise((resolve, reject) => {
            dao.save(collection, user).then(result => {
                console.log("UserService :: createUser, result : %j", result);
                resolve({users : result});
            }).catch(e=>{
                console.log("UserService :: createUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    getUsers(){
        console.log("UserService :: getUsers");
        return new Promise((resolve, reject) => {
            dao.find(collection, {}).then(result => {
                console.log("UserService :: getUsers, result : %j", result);
                resolve(result);
            }).catch(e=>{
                reject(e);
            });
        });   
    }

    updateUser(user){
        console.log("UserService :: updateUser");
        return new Promise((resolve, reject) => {
            console.log("updateUser =============== %j ", user);
            dao.updateById(collection, user, user._id).then(result => {
                console.log("UserService :: updateUser, result : %j", result);
                resolve({users : result});
            }).catch(e=>{
                console.log("UserService :: updateUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    getUserDetails(user){
        console.log("UserService :: getUserDetails");
        return new Promise((resolve, reject) => {
            console.log("getUserDetails =============== %j ", user);
            dao.findById(collection, user._id).then(result => {
                console.log("UserService :: getUserDetails, result : %j", result);
                resolve(result);
            }).catch(e=>{
                console.log("UserService :: getUserDetails, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    deleteUser(user){
        console.log("UserService :: deleteUser");
        return new Promise((resolve, reject) => {
            console.log("deleteUser =============== %j ", user);
            dao.deleteById(collection, user._id).then(result => {
                console.log("UserService :: deleteUser, result : %j", result);
                resolve(result);
            }).catch(e=>{
                console.log("UserService :: deleteUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }
}

module.exports = new CustomerService();