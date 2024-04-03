var TodoStatus;
(function (TodoStatus) {
    TodoStatus["Todo"] = "todo";
    TodoStatus["InProgress"] = "in-progress";
    TodoStatus["Done"] = "done";
})(TodoStatus || (TodoStatus = {}));
const todoItems = [
    {
        id: 1,
        title: "Learn HTML",
        status: TodoStatus.Done,
        completedOn: new Date("2021-09-11"),
    },
    { id: 2, title: "Learn TypeScript", status: TodoStatus.InProgress },
    { id: 3, title: "Write the best app in the world", status: TodoStatus.Done },
];
function addTodoItem(todo) {
    const id = getNextId(todoItems);
    const newTodo = {
        id,
        title: todo,
        status: TodoStatus.Todo,
    };
    todoItems.push(newTodo);
    return newTodo;
}
// Generic extends -> The type must have id
function getNextId(items) {
    return items.reduce((max, x) => (x.id > max ? x.id : max), 0) + 1;
}
const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app");
console.log(JSON.stringify(newTodo));
