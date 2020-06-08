const jwt = require("jsonwebtoken");
const dao = require('../dao/AuthDao');
const form = require('../form/AuthForm');
const BaseService = require('./BaseService');
const httpConstants = require('../constants/HTTPConstants');
const statusConstants = require('../constants/StatusConstants');
const ServerError = require('../response/ServerError');
const bcrypt = require("bcryptjs");
const _ = require('lodash');
const collection = "user";

class AuthService extends BaseService {

    constructor() {
        super(collection, dao);
    };

    /** Add a new user with default password*/
    create() {

    }

    /** Check if the user is inactive, prompt user to change password */
    /** If valid, send the login token */
    async login(authForm) {

        let user = await super.findOne({ email: authForm.login_id });
        if(!user) throw new ServerError(httpConstants.HTTP_NOT_FOUND, 'Bad Request', 'User does not Exists!');

        let pwdValid = bcrypt.compareSync(
            authForm.password,
            user.password
        );
        // Invalid Password
        if (_.isEmpty(user) || !pwdValid) throw new ServerError(httpConstants.HTTP_SERVER_ERROR, 'Invalid Username or Password', 'Invalid Username or Password');
        if (user.status == statusConstants.USER_INACTIVE) throw new ServerError(httpConstants.HTTP_REDIRECT, "User is Inactive, need to update password", "Inactive user. Please update your password.");
        if (user.status == statusConstants.USER_DELETED) throw new ServerError(httpConstants.HTTP_SERVER_ERROR, 'Account is locked. Please contact Admin', 'Account is locked. Please contact Admin');

        let token = jwt.sign(user, config.auth.myprivatekey, {
            expiresIn: config.auth.auth_ttl
        });
        delete user.password;
        user.auth_token = token;
        return user;
    }


    /** */
    authenticate(req, res, next) {

        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) {
            let error = new ServerError(httpConstants.HTTP_UNAUTHORIZED, "Access denied. No token provided.", "Access denied. No token provided.");
            return controller.sendError(req, res, error);
        }
        try {
            //if can verify the token, set req.user and pass to next middleware
            const decoded = jwt.verify(token, config.app.myprivatekey);
            req.user = decoded;
            next();
        } catch (ex) {
            //if invalid token
            let error = new ServerError(httpConstants.HTTP_UNAUTHORIZED, "Token not valid!", "Invalid Token");
            return controller.sendError(req, res, error);
        }
    }





    authorize(req, res, next) {

    }
}

module.exports = new AuthService();