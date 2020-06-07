class ServerError extends Error{

    constructor(statusCode, stack, message){
        super();
        this.code = -1;
        this.status_code = statusCode;
        this.error = {};
        this.error.message = message;
        this.error.detail = stack;
    }
}

module.exports = ServerError;