const Router = require('express').Router;
const router = new Router();
const todoController = require('../../controller/api/todo');
const authMiddleware = require('../../middleware/auth');

router.post('/', authMiddleware, todoController.create);
router.get('/', authMiddleware, todoController.get);
router.patch('/:id', authMiddleware, todoController.update);
router.delete('/:id', authMiddleware, todoController.delete);

module.exports = router;