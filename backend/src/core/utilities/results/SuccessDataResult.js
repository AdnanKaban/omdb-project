const DataResult = require('./DataResult');


class SuccessDataResult extends DataResult {
    constructor(data, message = "") {
        super(data, true, message);  
    }
}

module.exports = SuccessDataResult;