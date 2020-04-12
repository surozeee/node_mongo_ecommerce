var errorCode = require('./ErrorCodes');

// class CustomError extends Error {
//     constructor(code) {
//         super(code);
//         this.message = errorCode[code];
//         this.name = code;
//         this.statusCode= 417;
//     }
// }


class CustomError extends Error {
    constructor(code) {
        super();
        this.message = errorCode[code];
        this.name = code;
        this.success= false;
    }
}

const handleError = (err, res) => {
    //const { statusCode, message } = err;
    res.status(statusCode).json(err.data);
};

module.exports =  CustomError