const Router = require('express').Router;
const router = new Router();
const authController = require('../../controller/api/auth');
const authMiddleware = require('../../middleware/auth');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/logout', authMiddleware, authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;