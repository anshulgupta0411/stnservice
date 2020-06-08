const form = require('../form/UserForm');
const service = require('../service/UserService');
const BaseController = require('./BaseController');
const httpConstants = require('../constants/HTTPConstants');
const httpResponse =  require('../response/HttpResponse');

class UserController extends BaseController {

    constructor() {
        super();
    }

    async create(req, res, next) {

        try {
            let msg = "User created successfully";
            let userForm = new form(req, res);
            userForm.validateCreate();
            await service.create(await userForm.getCreateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, null, null));
        } catch (e) {
            console.log("UserController::createUser ERROR - %j", e.stack);
            console.log("UserController::createUser ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getAll(req, res, next) {

        try {
            let msg = "Users retrieved successfully";
            let root = "users";
            logger.debug("UserController :: getUsers ");
            let users = await service.findAll();
            logger.debug("UserController :: getUsers, Users = %j", users);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, root, users));
        } catch (e) {
            console.log("UserController::getUsers ERROR - %j", e);
            return super.sendError(req, res, e);
        }

    }

    async update(req, res, next) {

        try {
            let msg = "User updated successfully";
            let userForm = new form(req, res);
            userForm.validateCreate();
            await service.update(await userForm.getUpdateParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, null, null));
        } catch (e) {
            console.log("UserController::updateUser ERROR - %j", e.stack);
            console.log("UserController::updateUser ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

    async getDetails(req, res, next) {

        try {
            let msg = "User details retrieved successfully";
            let root = "user";
            let userForm = new form(req, res);
            let user = await service.findById(userForm);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, root, user));
        } catch (e) {
            console.log("UserController::createUser ERROR - %j", e);
            super.sendError(req, res, e);
        }

    }

    async delete(req, res, next) {
        try {

            let msg = "User deleted successfully";
            let root = null;
            let userForm = new form(req, res);
            await service.delete(userForm);
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, root, null));

        } catch (e) {
            console.log("UserController::createUser ERROR - %j", e);
            super.sendError(req, res, e);
        }
    }

    async changePassword(req, res, next){
        
        try {

            let msg = "Password updated successfully! Please login again";
            let root = null;
            let userForm = new form(req, res);
            await userForm.validateChangePwd();
            await service.changePassword(await userForm.getChangePwdParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_CREATED, msg, root, null));

        } catch (e) {
            console.log("UserController::changePassword ERROR - %j", e);
            super.sendError(req, res, e);
        }
    }
}

module.exports = new UserController();