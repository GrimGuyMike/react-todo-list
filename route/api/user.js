const Router = require('express').Router;
const router = new Router();
const userController = require('../../controller/api/user');
const authMiddleware = require('../../middleware/auth');

router.use(authMiddleware);

router.get('/', userController.get);
router.delete('/', userController.delete);

module.exports = router;