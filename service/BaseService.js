const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');

class BaseService{
    constructor(collection, dao){
        this.dao = dao;
        this.collection = collection;      
    }
    create(obj){
        console.log("BaseService :: create");
        return new Promise((resolve, reject) => {
            this.dao.save(this.collection, obj).then(result => {
                resolve({users : result});
            }).catch(e=>{
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    getAll(){
        console.log("BaseService :: getAll");
        return new Promise((resolve, reject) => {
            this.dao.find(this.collection, {}).then(result => {
                resolve(result);
            }).catch(e=>{
                reject(e);
            });
        });   
    }

    update(obj){
        console.log("BaseService :: update");
        return new Promise((resolve, reject) => {
            this.dao.updateById(this.collection, obj, obj.id).then(result => {
                resolve({users : result});
            }).catch(e=>{
                console.log("UserService :: updateUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    getDetails(obj){
        console.log("BaseService :: getDetails");
        return new Promise((resolve, reject) => {
            this.dao.findById(this.collection, obj.id).then(result => {
                resolve(result);
            }).catch(e=>{
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }

    delete(obj){
        console.log("BaseService :: delete");
        return new Promise((resolve, reject) => {
            this.dao.deleteById(this.collection, obj.id).then(result => {
                resolve(result);
            }).catch(e=>{
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });   
    }
}

module.exports = BaseService;