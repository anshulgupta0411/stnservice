const form = require('../form/SupplierForm');
const service = require('../service/SupplierService');
const BaseController = require('./BaseController');
const httpConstants = require('../constants/HTTPConstants');
const httpResponse =  require('../response/HttpResponse');
const statusConstants = require('../constants/StatusConstants');

class SupplierController extends BaseController {

    constructor() {
        super();
    }

    async create(req, res, next) {

        try {
            let msg = "Supplier created successfully";
            let supplierForm = new form(req, res);
            supplierForm.validateCreate();
            await service.create(await supplierForm.getCreateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, null, null));
        } catch (e) {
            console.log("SupplierController::createsupplier ERROR - %j", e.stack);
            console.log("SupplierController::createsupplier ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getAll(req, res, next) {

        try {
            let msg = "suppliers retrieved successfully";
            let root = "suppliers";
            logger.debug("SupplierController :: getsuppliers ");
            let suppliers = await service.findAll();
            logger.debug("SupplierController :: getsuppliers, suppliers = %j", suppliers);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, suppliers));
        } catch (e) {
            console.log("SupplierController::getsuppliers ERROR - %j", e);
            return super.sendError(req, res, e);
        }

    }

    async update(req, res, next) {

        try {
            let msg = "supplier updated successfully";
            let supplierForm = new form(req, res);
            supplierForm.validateCreate();
            await service.update(await supplierForm.getUpdateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, null, null));
        } catch (e) {
            console.log("SupplierController::updatesupplier ERROR - %j", e.stack);
            console.log("SupplierController::updatesupplier ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getDetails(req, res, next) {

        try {
            let msg = "supplier details retrieved successfully";
            let root = "supplier";
            let supplierForm = new form(req, res);
            let supplier = await service.findById(supplierForm);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, supplier));
        } catch (e) {
            console.log("SupplierController::createsupplier ERROR - %j", e);
            super.sendError(req, res, e);
        }

    }

    async delete(req, res, next) {
        try {

            let msg = "supplier deleted successfully";
            let root = null;
            let supplierForm = new form(req, res); 
            let supplier = await service.findById(supplierForm);
            supplier.status = statusConstants.SUPPLIER_DELETED;
            await service.updateById(supplier);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, null));

        } catch (e) {
            console.log("SupplierController::createsupplier ERROR - %j", e);
            super.sendError(req, res, e);
        }
    }

    async changePassword(req, res, next){
        
        try {

            let msg = "Password updated successfully! Please login again";
            let root = null;
            let supplierForm = new form(req, res);
            await supplierForm.validateChangePwd();
            await service.changePassword(await supplierForm.getChangePwdParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, root, null));

        } catch (e) {
            console.log("SupplierController::changePassword ERROR - %j", e);
            super.sendError(req, res, e);
        }
    }
}

module.exports = new SupplierController();