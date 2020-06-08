const _ = require('lodash');
const stringUtil = require('../util/StringUtil');
const error = require('../response/ValidationError');
const createMandatoryFields = ["name", "code"];
const updateMandatoryFields = ["id","name", "code"];
const statusConst = require('../constants/StatusConstants');

const displayName =
{
    "name": "Customer Name",
    "code": "Customer Code",
};

class CustomerForm {

    constructor(httpReq) {

        let reqBody = httpReq.body;
        console.log(reqBody);
        let reqParams = httpReq.params;
        let queryParams = httpReq.query;
        let headers = httpReq.headers;
        this.id = reqParams && reqParams.id ? reqParams.id : 0;
        this.name = reqBody.name ? reqBody.name : null;
        this.code = reqBody.code ? reqBody.code : null;
        this.status = reqBody.status ? reqBody.status : statusConst.CUSTOMER_ACTIVE;
        this.created_by = reqBody.created_by ? reqBody.created_by : null;
    }

    async validateCreate() {

        createMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", displayName[key] + " is mandatory and should not be empty");
                throw err;
            }
        });
    }

    async validateUpdate() {
        updateMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", displayName[key] + " is mandatory and should not be empty");
                throw err;
            }
        });
    }

    async getCreateParams() {

        let obj = {};
        obj.name = this.name;
        obj.code = this.code;
        obj.status = this.status,
        obj.created_by = this.created_by ? this.created_by : "admin";
        return obj;
    }

    async getUpdateParams() {

        let obj = {};
        obj.id = this.id;
        obj.name = this.name;
        obj.code = this.code;
        obj.status = this.status;
        obj.created_by = this.created_by ? this.created_by : "admin";
        return obj;
    }
}

module.exports = CustomerForm;