class Error {

    constructor(status, title, detail) {
        this.status = status;
        this.title = title;
        this.message = detail;
    }
}

module.exports = Error;