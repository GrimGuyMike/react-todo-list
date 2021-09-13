const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Model export
const Todo = require('../../models/Todo');

// ROUTE:   GET /api/todos
// ACCESS:  Private
// DESC:    Get all todos
router.get('/', auth, (req, res) => {

    Todo
    .find({ userId: req.user.id })
    .sort({ done: 1, date: -1 })
    .then(todos => res.json(todos))
    .catch(err => console.log(err.message));

});

// ROUTE:   POST /api/todos
// ACCESS:  Private
// DESC:    Create new todo
router.post('/', auth, (req, res) => {

    const newTodo = new Todo(req.body);

    newTodo
    .save()
    .then(todo => res.json(todo));

});

// ROUTE:   DELETE /api/todos/:id
// ACCESS:  Private
// DESC:    Delete todo
router.delete('/:id', auth, (req, res) => {

    Todo
    .findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true, removedId: todo._id.toString() })))
    .catch(err => res.status(400).json({ success: false, message: err.message }));

});

// ROUTE:   PATCH /api/todos/:id
// ACCESS:  Private
// DESC:    Mark todo as done
router.patch('/:id', auth, (req, res) => {

    Todo
    .findById(req.params.id)
    .then(doc => {
        doc.done = req.body.done;
        doc.save()
        .then(updated => res.json({ toggleId: updated._id.toString() }));
    });

});

// ROUTE:   DELETE /api/todos/:userId
// ACCESS:  Private
// DESC:    Delete all user's todos
router.delete('/deletemany/:userId', (req, res) => {

    const userId = req.params.userId;

    Todo.deleteMany({ userId }, (err) => {

        if(err) throw err;

        res.json({ success: true });

    });

});

module.exports = router;