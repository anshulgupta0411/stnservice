const _ = require('lodash');
const stringUtil = require('../util/StringUtil');
const error = require('../response/AuthError');
const loginMandatoryFields = ["login_id", "password"];

const displayName =
{
    "login_id": "Login Id",
    "password": "Password"
};

class AuthForm {

    constructor(httpReq) {

        let reqBody = httpReq.body;
        console.log(reqBody);
        let reqParams = httpReq.params;
        let queryParams = httpReq.query;
        let headers = httpReq.headers;
        this.login_id = reqBody.login_id ? reqBody.login_id : null;
        this.password = reqBody.password ? reqBody.password : null;

    }

    validateLogin() {

        loginMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", displayName[key] + " is mandatory and should not be empty");
                throw err;
            }
        });
    }

    getloginParams() {

        let obj = {};
        obj.login_id = this.login_id;
        obj.password = this.password;
        return obj;
    }
}

module.exports = AuthForm;