const todoService = require('../../service/todo');

class TodoController {
    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const text = req.body.text;
            const todoData = await todoService.create(userId, text);
            res.json(todoData);
        } catch(err) {
            next(err);
        }
    };

    async get(req, res, next) {
        try {
            const userId = req.user.id;
            const todosData = await todoService.get(userId);
            res.json(todosData);
        } catch(err) {
            next(err);
        }
    };

    async update(req, res, next) {
        try {
            const userId = req.user.id;
            const todoId = req.params.id;
            const done = req.body.done;
            console.log(done);
            const todoData = await todoService.update(userId, todoId, done);
            res.json(todoData);
        } catch(err) {
            next(err);
        }
    };

    async delete(req, res, next) {
        try {
            const userId = req.user.id;
            const todoId = req.params.id;
            await todoService.deleteOne(userId, todoId);
            res.end();
        } catch(err) {
            next(err);
        }
    };
};

module.exports = new TodoController();