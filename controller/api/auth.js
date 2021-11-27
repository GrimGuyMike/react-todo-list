const authService = require('../../service/auth');

class AuthController {
    async signup(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const { userData, refresh } = await authService.register(name, email, password);

            res.cookie(
                'refreshToken',
                refresh.token,
                {
                    maxAge: refresh.expiresIn * 1000,
                    httpOnly: true
                }
            );
            res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const { userData, refresh } = await authService.signin(email, password);

            res.cookie(
                'refreshToken',
                refresh.token,
                {
                    maxAge: refresh.expiresIn * 1000,
                    httpOnly: true
                }
            );
            res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async logout(req, res, next) {
        try {
            const userId = req.user.id;
            await authService.logout(userId);

            res.clearCookie('refreshToken');
            res.end();
        } catch(err) {
            next(err);
        }
    };

    async refresh(req, res, next) {
        try {
            const refreshCookie = req.cookies['refreshToken'];
            const { access, refresh } = await authService.refresh(refreshCookie);

            res.cookie(
                'refreshToken',
                refresh.token,
                {
                    maxAge: refresh.expiresIn * 1000,
                    httpOnly: true
                }
            );
            res.json(access);
        } catch(err) {
            next(err);
        }
    };
};

module.exports = new AuthController();