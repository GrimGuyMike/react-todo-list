const { ApiError } = require('../exception');
const { User, Todo, RefreshToken } = require('../database');
const validate = require('./validation');
const bcrypt = require('bcrypt');
const tokenService = require('../service/token');

class AuthService {
    async register(name, email, password) {
        if(!(name && email && password)) throw ApiError.BadRequest('insufficient data');

        validate.name(name);
        validate.email(email);
        validate.password(password);

        const userExists = await User.exists({ email });
        if(userExists) throw ApiError.Conflict('user already exists');

        const passwordHash = bcrypt.hashSync(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: passwordHash
        });

        const access = tokenService.generateAccess({ id: user.id });
        const refresh = tokenService.generateRefresh({ id: user.id });
        await tokenService.saveRefresh(user.id, refresh.token);

        const userData = user.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.password;
                delete ret._id;
                ret.id = doc.id;
                ret.access = access;
                return ret;
            }
        });

        return { userData, refresh };
    };

    async signin(email, password) {
        if(!(email && password)) throw ApiError.BadRequest('insufficient data');

        const user = await User.findOne({ email });
        if(!user) throw ApiError.NotFound('user does not exist');

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch) throw ApiError.BadRequest('wrong password');

        const access = tokenService.generateAccess({ id: user.id });
        const refresh = tokenService.generateRefresh({ id: user.id });
        await tokenService.saveRefresh(user.id, refresh.token);

        const userData = user.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.password;
                delete ret._id;
                ret.id = doc.id;
                ret.access = access;
                return ret;
            }
        });

        return { userData, refresh };
    };

    async logout(userId) {
        await tokenService.deleteRefresh(userId);
    };

    async refresh(token) {
        if(!token) throw ApiError.Unauthorized('refresh token is absent');

        const { id: userId } = tokenService.verifyRefresh(token);

        const refreshFromDb = await RefreshToken.findOne({ userId });
        if(!refreshFromDb || refreshFromDb.token !== token) {
            await tokenService.deleteRefresh()
            throw ApiError.Unauthorized('invalid refresh token');
        }

        const access = tokenService.generateAccess({ id: userId });
        const refresh = tokenService.generateRefresh({ id: userId });
        await tokenService.saveRefresh(userId, refresh.token);

        return { access, refresh };
    };
};

module.exports = new AuthService();