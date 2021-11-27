const userService = require('../../service/user');

class UserController {
    async get(req, res, next) {
        try {
            const userId = req.user.id;
            const userData = await userService.get(userId);
            res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async delete(req, res, next) {
        try {
            const userId = req.user.id;
            await userService.delete(userId);

            res.clearCookie('refreshToken');
            res.end();
        } catch(err) {
            next(err);
        }
    };
};

module.exports = new UserController();