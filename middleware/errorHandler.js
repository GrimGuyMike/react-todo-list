const { ApiError } = require('../exception');

module.exports = function(err, req, res) {
    if(err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
    } else {
        console.error(err);
        res.status(500).json({ message: 'unexpected error' });
    }
};