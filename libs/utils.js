/**
 * Personal short lib for HTTP requests
 * From: @pedrost
 */

/**
 * response message according by code.
 * @param {Object} res request object.
 * @param {String} message response message.
 * @param {Number} code HTTP code number.
 */
sendResponseByCode = (res, message, code) => {
    res.status(code);
    res.json({
        message: message
    });
}

/**
 * send response with code 400.
 * @param {Object} res request object.
 * @param {String} message response message.
 */
module.exports.badResquest = (res, message) => {
    sendResponseByCode(res, message, 400);
}

/**
 * send response with code 500.
 * @param {Object} res request object.
 * @param {String} message response message.
 */
module.exports.badImplementation = (res, message) => {
    sendResponseByCode(res, message, 500);
}

/**
 * send response with code 403.
 * @param {Object} res request object.
 * @param {String} message response message.
 */
module.exports.forbidden = (res, message) => {
    sendResponseByCode(res, message, 403);
}

/**
 * send response with code 401.
 * @param {Object} res request object.
 * @param {String} message response message.
 */
module.exports.unauthorized = (res, message) => {
    sendResponseByCode(res, message, 401);
}

/**
 * send response with code 404.
 * @param {Object} res request object.
 * @param {String} message response message.
 */
module.exports.notFound = (res, message) => {
    sendResponseByCode(res, message, 404);
}