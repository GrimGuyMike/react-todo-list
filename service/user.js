const User = require('../model/User');
const authService = require('./auth');
const todoService = require('./todo');

class UserService {
    async get(userId) {
        const user = await User.findById(userId);
        const userData = user.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.password;
                delete ret._id;
                ret.id = doc.id;
                return ret;
            }
        });

        return userData;
    };

    async delete(userId) {
        await authService.logout(userId);
        await todoService.deleteAll(userId);

        await User.findByIdAndDelete(userId);
    };
};

module.exports = new UserService();