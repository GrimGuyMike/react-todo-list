const Router = require('express').Router;
const router = new Router();
const todoController = require('../../controller/api/todo');
const authMiddleware = require('../../middleware/auth');

router.use(authMiddleware);

router.post('/', todoController.create);
router.get('/', todoController.get);
router.patch('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;