import api from "../http";

class TodoService {
    async fetch() {
        return await api.get('/todo');
    };

    async add(todoData) {
        return await api.post('/todo', todoData);
    };

    async remove(todoId) {
        return await api.delete(`/todo/${todoId}`);
    };

    async toggle(todoId, todoData) {
        return await api.patch(`/todo/${todoId}`, todoData);
    };
};

export default new TodoService();