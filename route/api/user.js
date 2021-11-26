const Router = require('express').Router;
const router = new Router();
const userController = require('../../controller/api/user');
const authMiddleware = require('../../middleware/auth');

router.get('/', authMiddleware, userController.get);
router.delete('/', authMiddleware, userController.delete);

module.exports = router;