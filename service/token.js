const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../database');
const { ApiError } = require('../exception');

class TokenService {
    generateAccess(payload) {
        const expiresIn = 3600;
        const token = jwt.sign(
            payload,
            process.env.ACCESS_SECRET,
            {
                expiresIn
            }
        );

        return { token, expiresIn };
    };

    generateRefresh(payload) {
        const expiresIn = 30 * 24 * 60 * 60;
        const token = jwt.sign(
            payload,
            process.env.REFRESH_SECRET,
            {
                expiresIn
            }
        );

        return { token, expiresIn };
    };

    verifyAccess(token) {
        try {
            const claims = jwt.verify(
                token,
                process.env.ACCESS_SECRET
            );
    
            return claims;
        } catch(err) {
            if(err instanceof jwt.TokenExpiredError) {
                throw ApiError.Unauthorized('access token is expired');
            } else if(err instanceof jwt.JsonWebTokenError) {
                throw ApiError.Unauthorized('access token is invalid');
            } else {
                throw err;
            }
        }
    };

    verifyRefresh(token) {
        try {
            const claims = jwt.verify(
                token,
                process.env.REFRESH_SECRET
            );
    
            return claims;
        } catch(err) {
            if(err instanceof jwt.TokenExpiredError) {
                throw ApiError.Unauthorized('refresh token is expired');
            } else if(err instanceof jwt.JsonWebTokenError) {
                throw ApiError.Unauthorized('refresh token is invalid');
            } else {
                throw err;
            }
        }
    };

    async saveRefresh(userId, token) {
        const tokenExists = await RefreshToken.exists({ userId });

        if(tokenExists) {
            await RefreshToken.findOneAndUpdate({ userId }, { token });
        } else {
            await RefreshToken.create({ userId, token });
        }
    };

    async deleteRefresh(userId) {
        await RefreshToken.findOneAndDelete({ userId });
    };
};

module.exports = new TokenService();