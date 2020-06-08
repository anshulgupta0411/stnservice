const form = require('../form/CustomerForm');
const service = require('../service/CustomerService');
const BaseController = require('./BaseController');
const httpConstants = require('../constants/HTTPConstants');
const httpResponse =  require('../response/HttpResponse');
const statusConstants = require('../constants/StatusConstants');

class CustomerController extends BaseController{
    
    constructor() {
        super();
    }

    async create(req, res, next) {

        try {
            let msg = "customer created successfully";
            let customerForm = new form(req, res);
            customerForm.validateCreate();
            await service.create(await customerForm.getCreateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, null, null));
        } catch (e) {
            console.log("customerController::createcustomer ERROR - %j", e.stack);
            console.log("customerController::createcustomer ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getAll(req, res, next) {

        try {
            let msg = "customers retrieved successfully";
            let root = "customers";
            logger.debug("customerController :: getcustomers ");
            let customers = await service.findAll();
            logger.debug("customerController :: getcustomers, customers = %j", customers);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, customers));
        } catch (e) {
            console.log("customerController::getcustomers ERROR - %j", e);
            return super.sendError(req, res, e);
        }

    }

    async update(req, res, next) {

        try {
            let msg = "customer updated successfully";
            let customerForm = new form(req, res);
            customerForm.validateCreate();
            await service.update(await customerForm.getUpdateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, null, null));
        } catch (e) {
            console.log("customerController::updatecustomer ERROR - %j", e.stack);
            console.log("customerController::updatecustomer ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getDetails(req, res, next) {

        try {
            let msg = "customer details retrieved successfully";
            let root = "customer";
            let customerForm = new form(req, res);
            let customer = await service.findById(customerForm);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, customer));
        } catch (e) {
            console.log("customerController::createcustomer ERROR - %j", e);
            super.sendError(req, res, e);
        }

    }

    async delete(req, res, next) {
        try {

            let msg = "customer deleted successfully";
            let root = null;
            let customerForm = new form(req, res);
            let customer = await service.findById(customerForm);
            customer.status = statusConstants.USER_DELETED;
            await service.updateById(customer);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, null));

        } catch (e) {
            console.log("customerController::createcustomer ERROR - %j", e);
            super.sendError(req, res, e);
        }
    }
}

module.exports = new CustomerController();