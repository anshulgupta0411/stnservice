const form = require('../form/AuthForm');
const service = require('../service/AuthService');
const BaseController = require('./BaseController');
const httpConstants = require('../constants/HTTPConstants');
const httpResponse = require('../response/HttpResponse');

class AuthController extends BaseController {

    constructor() {
        super();
    }

    async login(req, res, next) {

        try {
            let msg = "User created successfully";
            let authForm = new form(req);
            authForm.validateLogin();
            let user = await service.login(authForm.getloginParams());
            super.sendResponse(req, res, new httpResponse(httpConstants.HTTP_OK, msg, "user", user));
        } catch (e) {
            console.log("UserController::createUser ERROR - %j", e.stack);
            console.log("UserController::createUser ERROR - %s", e.message);
            super.sendError(req, res, e);
        }
    }

}

module.exports = new AuthController();