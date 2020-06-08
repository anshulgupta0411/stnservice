const dao = require('../dao/SupplierDao');
const collection = "supplier";
const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');
const statusConstants = require('../constants/StatusConstants');
const BaseService = require('./BaseService');

class SupplierService extends BaseService {

    constructor() {
        super(collection, dao);
    }
}

module.exports = new SupplierService();