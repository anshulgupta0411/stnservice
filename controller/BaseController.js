const ValidationError = require('../response/ValidationError');
const ServerError = require('../response/ServerError');

class BaseController {
    constructor() {

    }

    sendResponse(req, res, httpResponse) {
        console.log("BaseController::sendError sendResponse");
        return res.status(httpResponse.status_code).json(httpResponse);
    }

    sendError(req, res, err) {

        try {
            if (err instanceof ValidationError) {
                
                console.log("BaseController::sendError ValidationError occured - %j", err);
                return res.status(err.status_code).json(err);

            } else if (err instanceof ServerError) {

                console.log("BaseController::sendError ServerError occured - %j", err);
                return res.status(err.status_code).json(err);

            } else {
                console.log("BaseController::sendError Runtime error occured - %j", err);
                let output = {};
                output.code = -1;
                output.error = {};
                output.error.message = err.message;
                output.error.detail = err.stack;
                return res.status(500).json(output);
            }
        } catch (e) {
            console.log("BaseController::sendError Unknown error occured - %j", e);
            let output = {};
            output.code = -2;
            output.error = {};
            output.error.message = e.message;
            output.error.detail = e.stack;
            return res.status(500).json(output);
        }

    }
}

module.exports = BaseController;