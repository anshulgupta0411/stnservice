const bcrypt = require("bcryptjs");
const _ = require('lodash');
const stringUtil = require('../util/StringUtil');
const error = require('../response/ValidationError');
let statusConst = require('../constants/StatusConstants');

const createMandatoryFields = ["fname", "lname", "email"];
const updateMandatoryFields = ["id","fname", "lname", "email"];
const changePwdMandatoryFields = ["login_id", "old_password", "new_password", "retype_password"];
const PASSWORD_LENGTH = 8;

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
        this.login_id = reqBody.login_id ? reqBody.login_id : (reqBody.email ? reqBody.email : null);
        this.login_id_upper = this.login_id ? this.login_id.toUpperCase() : null;
        this.status = reqBody.status ? reqBody.status : statusConst.USER_INACTIVE;
        this.created_by = reqBody.created_by ? reqBody.created_by : null;
        this.preferences = reqBody.preferences ? reqBody.preferences : null;
        this.id = reqParams && reqParams.id ? reqParams.id : 0;
/*
        this.password = reqBody.password ? reqBody.password : await bcrypt.hash(config.auth.default_password, PASSWORD_LENGTH);
        this.old_password = reqBody.old_password ? await bcrypt.hash(reqBody.old_password, PASSWORD_LENGTH) : null;
        this.new_password = reqBody.new_password ? await bcrypt.hash(reqBody.new_password, PASSWORD_LENGTH) : null;
        this.retype_password = reqBody.retype_password ? await bcrypt.hash(reqBody.retype_password, PASSWORD_LENGTH) : null;
*/

        this.password = reqBody.password ? reqBody.password : config.auth.default_password;
        this.old_password = reqBody.old_password ? reqBody.old_password : null;
        this.new_password = reqBody.new_password ? reqBody.new_password : null;
        this.retype_password = reqBody.retype_password ? reqBody.retype_password : null;
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

    async validateChangePwd(){
        changePwdMandatoryFields.forEach((key) => {
            if (!stringUtil.isPresent(this[key])) {
                var err = new error("400", "Bad Request", key + " is mandatory and should not be empty");
                throw err;
            }
        });

        if(this.new_password != this.retype_password) throw new error("400", "Bad Request", "Password and Re-typed password does not match");
    }

    async getCreateParams() {

        let obj = {};
        obj.fname = this.fname;
        obj.lname = this.lname;
        obj.email = this.email;
        obj.login_id = this.login_id;
        obj.login_id_upper = this.login_id.toUpperCase();
        obj.status = this.status ? this.status : 'A';
        obj.created_by = this.created_by ? this.created_by : 'admin';
        obj.preferences = this.preferences;
        obj.password = await bcrypt.hash(this.password, PASSWORD_LENGTH);
        return obj;
    }

    async getUpdateParams() {

        let obj = {};
        obj.id = this.id;
        obj.fname = this.fname;
        obj.lname = this.lname;
        obj.email = this.email;
        obj.login_id = this.login_id;
        obj.login_id_upper = this.login_id.toUpperCase();
        obj.updated_by = this.updated_by ? this.updated_by : 'admin';
        obj.preferences = this.preferences;
        return obj;
    }

    async getChangePwdParams(){
        
        let obj = {};
        obj.id = this.id;
        obj.login_id_upper = this.login_id.toUpperCase();
        obj.status = statusConst.USER_ACTIVE;
        obj.updated_by = this.updated_by ? this.updated_by : 'admin';
        
        //obj.password = await bcrypt.hash(this.new_password, PASSWORD_LENGTH);
        //obj.old_password = await bcrypt.hash(this.old_password, PASSWORD_LENGTH);
        obj.old_password = this.old_password;
        obj.password = this.new_password;
        return obj;
    }
}

module.exports = UserForm;