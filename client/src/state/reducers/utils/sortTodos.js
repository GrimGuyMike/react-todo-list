export default function(todos) {
    const undone = todos.filter(todo => !todo.done);
    const done = todos.filter(todo => todo.done);
    undone.sort((a, b) => +b.date - +a.date);
    done.sort((a, b) => +b.date - +a.date);

    return [ ...undone, ...done ];
};