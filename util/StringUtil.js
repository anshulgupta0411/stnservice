const lodash = require('lodash');
class StringUtil {

    constructor(){

    }

    isPresent(value){
        if(value && typeof value !== 'undefined') return true;
        return false;
    }

}

module.exports = new StringUtil();