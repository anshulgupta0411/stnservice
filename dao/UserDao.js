const BaseDao = require('./BaseDao');
class UserDao extends BaseDao{

    constructor(){
        super();
    }
}

module.exports = new UserDao();