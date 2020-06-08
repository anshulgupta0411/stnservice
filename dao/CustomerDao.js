const BaseDao = require('./BaseDao');

class CustomerDao extends BaseDao{

    constructor(){
        super();
    }
}

module.exports = new CustomerDao();