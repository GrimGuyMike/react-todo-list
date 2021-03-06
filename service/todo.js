const Todo = require('../model/Todo');
const { ApiError } = require('../exception');
const validate = require('../service/validation');

class TodoService {
    async create(userId, text) {
        if(!text) throw ApiError.BadRequest('insufficient data');

        validate.todoText(text);

        const todo = await Todo.create({
            userId,
            text
        });

        const todoData = todo.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.userId;
                delete ret._id;
                ret.date = +(new Date(ret.date));
                ret.id = doc.id;
                return ret;
            }
        });

        return todoData;
    };

    async get(userId) {
        const todos = await Todo.find({ userId });

        const todosData = todos.map(todo => todo.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.userId;
                delete ret._id;
                ret.date = +(new Date(ret.date));
                ret.id = doc.id;
                return ret;
            }
        }));

        return todosData;
    };

    async update(userId, todoId, done) {
        if(typeof done !== 'boolean') throw ApiError.BadRequest('insufficient data');

        const todo = await Todo.findOneAndUpdate({ _id: todoId }, { done }, { new: true });
        if(todo.userId !== userId) throw ApiError.Forbidden('entry can only be modified by its creator');

        const todoData = todo.toObject({
            versionKey: false,
            transform: (doc, ret) => {
                delete ret.userId;
                delete ret._id;
                ret.date = +(new Date(ret.date));
                ret.id = doc.id;
                return ret;
            }
        });

        return todoData;
    };

    async deleteOne(userId, todoId) {
        const todo = await Todo.findOne({ _id: todoId });
        if(!todo) throw ApiError.NotFound('todo does not exist');

        if(todo.userId !== userId) throw ApiError.Forbidden('entry can only be deleted by its creator');

        await Todo.findByIdAndDelete(todoId);
    };

    async deleteAll(userId) {
        await Todo.deleteMany({ userId });
    };
};

module.exports = new TodoService();