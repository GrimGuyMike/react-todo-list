const { ApiError } = require('../exception');
const tokenService = require('../service/token');

module.exports = function(req, res, next) {
    const header = req.header('Authorization');
    const token = header?.split(' ')[1];
    if(!token) throw ApiError.Unauthorized('access token is absent');

    const claims = tokenService.verifyAccess(token);
    req.user = claims;

    next();
};