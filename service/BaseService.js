const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');

class BaseService {
    constructor(collection, dao) {
        this.dao = dao;
        this.collection = collection;
    }
    
    /**To override the default collection */
    setCollection(name){
        this.collection = name;
    }

    create(obj) {
        console.log("BaseService :: create");
        return new Promise((resolve, reject) => {
            this.dao.save(this.collection, obj).then(result => {
                resolve({ users: result });
            }).catch(e => {
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }

    findAll() {
        console.log("BaseService :: getAll");
        return new Promise((resolve, reject) => {
            this.dao.find(this.collection, {}).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }

    find(query) {
        console.log("BaseService :: find");
        return new Promise((resolve, reject) => {
            this.dao.find(this.collection, query).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }

    findOne(query) {
        console.log("BaseService :: findOne");
        return new Promise((resolve, reject) => {
            this.dao.findOne(this.collection, query).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }


    findById(obj) {
        console.log("BaseService :: getDetails");
        return new Promise((resolve, reject) => {
            this.dao.findById(this.collection, obj.id).then(result => {
                resolve(result);
            }).catch(e => {
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }


    updateById(obj) {
        console.log("BaseService :: update");
        return new Promise((resolve, reject) => {
            this.dao.updateById(this.collection, obj, obj.id).then(result => {
                resolve({ users: result });
            }).catch(e => {
                console.log("UserService :: updateUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }

    update(obj, query) {
        console.log("BaseService :: update");
        return new Promise((resolve, reject) => {
            this.dao.update(this.collection, obj, query).then(result => {
                resolve({ users: result });
            }).catch(e => {
                console.log("UserService :: updateUser, ERROR : %j", e);
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }


    deleteById(obj) {
        console.log("BaseService :: delete");
        return new Promise((resolve, reject) => {
            this.dao.deleteById(this.collection, obj.id).then(result => {
                resolve(result);
            }).catch(e => {
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }

    delete(obj, query) {
        console.log("BaseService :: delete");
        return new Promise((resolve, reject) => {
            this.dao.deleteById(this.collection, query).then(result => {
                resolve(result);
            }).catch(e => {
                let error = new ServerError(httpConstants.HTTP_SERVER_ERROR, e.stack, e.message);
                reject(error);
            });
        });
    }
}

module.exports = BaseService;