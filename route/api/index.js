const Router = require('express').Router;
const router = new Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const todoRouter = require('./todo');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;