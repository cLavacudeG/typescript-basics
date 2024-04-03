enum TodoStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done",
}

interface TodoItem {
  id: number;
  title: string;
  status: TodoStatus;
  completedOn?: Date;
}

const todoItems: TodoItem[] = [
  {
    id: 1,
    title: "Learn HTML",
    status: TodoStatus.Done,
    completedOn: new Date("2021-09-11"),
  },
  { id: 2, title: "Learn TypeScript", status: TodoStatus.InProgress },
  { id: 3, title: "Write the best app in the world", status: TodoStatus.Done },
];

function addTodoItem(todo: string): TodoItem {
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
function getNextId<T extends { id: number }>(items: T[]): number {
  return items.reduce((max, x: T) => (x.id > max ? x.id : max), 0) + 1;
}

const newTodo = addTodoItem(
  "Buy lots of stuff with all the money we make from the app",
);

console.log(JSON.stringify(newTodo));
