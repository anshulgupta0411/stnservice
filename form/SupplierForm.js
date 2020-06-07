const _ = require('lodash');
const stringUtil = require('../util/StringUtil');
const error = require('../response/ValidationError');
const createMandatoryFields = ["name", "code"];
const updateMandatoryFields = ["id","name", "code"];

const displayName =
{
    "name": "Supplier Name",
    "code": "Supplier Code",
};

class SupplierForm {

    constructor(httpReq) {

        let reqBody = httpReq.body;
        console.log(reqBody);
        let reqParams = httpReq.params;
        let queryParams = httpReq.query;
        let headers = httpReq.headers;
        this.id = reqParams && reqParams.id ? reqParams.id : 0;
        this.name = reqBody.name ? reqBody.name : null;
        this.code = reqBody.lname ? reqBody.lname : null;
        this.enabled = reqBody.enabled ? reqBody.enabled : 0,
        this.created_by = reqBody.created_by ? reqBody.created_by : null;
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
        obj.name = this.name;
        obj.code = this.code;
        obj.enabled = this.enabled,
        obj.created_by = this.created_by ? this.created_by : "admin";
        return obj;
    }

    getUpdateParams() {

        let obj = {};
        obj.id = this.id;
        obj.name = this.name;
        obj.code = this.code;
        obj.enabled = this.enabled,
        obj.created_by = this.created_by ? this.created_by : "admin";
        return obj;
    }
}

module.exports = SupplierForm;