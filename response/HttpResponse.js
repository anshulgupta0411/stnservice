class HttpResponse{

    constructor(statusCode, msg, root, data){

        this.code = 0;
        this.status_code = statusCode;
        this.message = msg;
        if(root != null){
            let output = {};
            output[root] = data;
            this.data = output;
        }
    }
}

module.exports = HttpResponse;