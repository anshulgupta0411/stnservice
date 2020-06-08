const dao = require('../dao/CustomerDao');
const collection = "customer";
const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');
const statusConstants = require('../constants/StatusConstants');
const BaseService = require('./BaseService');

class CustomerService extends BaseService {

    constructor() {
        super(collection, dao);
    }
}

module.exports = new CustomerService();