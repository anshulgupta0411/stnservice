const dao = require('../dao/UserDao');
const collection = "user";
const ServerError = require('../response/ServerError');
const httpConstants = require('../constants/HTTPConstants');
const statusConstants = require('../constants/StatusConstants');
const BaseService = require('./BaseService');
const bcrypt = require("bcryptjs");

class UserService extends BaseService {

    constructor() {
        super(collection, dao);
    }

    async changePassword(user) {

        try {
            let dbUser = await super.findOne({ login_id_upper: user.login_id_upper });
            let pwdValid = await bcrypt.compare(user.old_password, dbUser.password);

            if (!pwdValid) throw new ServerError(httpConstants.HTTP_BAD_REQUEST, "Invalid Old Password", "Please enter valid 'Old Password' value");
            dbUser.password = await bcrypt.hash(user.password, 8);
            dbUser.status = statusConstants.USER_ACTIVE;
            await super.update(dbUser, {login_id_upper: user.login_id_upper});
            return dbUser;
        } catch (e) {
            throw e;
        }

    }
}

module.exports = new UserService();