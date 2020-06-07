const _ = require('lodash');
const stringUtil = require('../util/StringUtil');
const error = require('../response/ValidationError');
const createMandatoryFields = ["fname", "lname", "email"];
const updateMandatoryFields = ["id","fname", "lname", "email"];

const displayName =
{
    "fname": "First Name",
    "lname": "Last Name",
    "email": "Email Address"
};

class UserForm {

    constructor(httpReq) {

        let reqBody = httpReq.body;
        console.log(reqBody);
        let reqParams = httpReq.params;
        let queryParams = httpReq.query;
        let headers = httpReq.headers;
        this.fname = reqBody.fname ? reqBody.fname : null;
        this.lname = reqBody.lname ? reqBody.lname : null;
        this.email = reqBody.email ? reqBody.email : null;
        this.password = reqBody.password ? reqBody.password : null;
        this.login_id = reqBody.email ? reqBody.email : null;
        this.login_id_upper = this.login_id ? this.login_id.toUpperCase() : null;
        this.status = reqBody.status ? reqBody.status : null;
        this.created_by = reqBody.created_by ? reqBody.created_by : null;
        this.preferences = reqBody.preferences ? reqBody.preferences : null;
        this.id = reqParams && reqParams.id ? reqParams.id : 0;

    }

    validateCreate() {

        createMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", displayName[key] + " is mandatory and should not be empty");
                throw err;
            }
        });
    }

    validateUpdate() {
        updateMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", displayName[key] + " is mandatory and should not be empty");
                throw err;
            }
        });
    }

    getCreateParams() {

        let obj = {};
        obj.fname = this.fname;
        obj.lname = this.lname;
        obj.email = this.email;
        obj.login_id = this.login_id;
        obj.login_id_upper = this.login_id.toUpperCase();
        obj.status = this.status ? this.status : 'A';
        obj.created_by = this.created_by ? this.created_by : 'admin';
        obj.preferences = this.preferences;
        return obj;
    }

    getUpdateParams() {

        let obj = {};
        obj.id = this.id;
        obj.fname = this.fname;
        obj.lname = this.lname;
        obj.email = this.email;
        obj.login_id = this.login_id;
        obj.login_id_upper = this.login_id.toUpperCase();
        obj.status = this.status;
        obj.updated_by = this.updated_by ? this.updated_by : 'admin';
        obj.preferences = this.preferences;
        return obj;
    }
}

module.exports = UserForm;