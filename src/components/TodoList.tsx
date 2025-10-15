import { useAppSelector } from "../store";

export const TodoList = () => {
  const todos = useAppSelector(store => {
    return store.todo
  });

  return (
    <ul>
      {todos.map(todo => <li key={todo}>{todo}</li>)}
    </ul>
  )
};
