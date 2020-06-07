const dao = require('../dao/UserDao');
const collection = "user";
const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');
const BaseService = require('./BaseService');

class UserService extends BaseService{

    constructor(){
        super(collection, dao);
    }
   
 
}

module.exports = new UserService();