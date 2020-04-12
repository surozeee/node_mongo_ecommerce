import CustomError from '../error/CustomError';

function resolved(result) {
    //console.log('Resolved');
}

function rejected(result) {
    //console.error(result);
}

module.exports = {
    handleErrorPromise : function(customError) {
        Promise.reject(customError).then(resolved, rejected);
        return;
    }
}
