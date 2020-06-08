const BaseDao = require('./BaseDao');
class AuthDao extends BaseDao{

    constructor(){
        super();
    }
}

module.exports = new AuthDao();