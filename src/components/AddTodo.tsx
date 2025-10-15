import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store";

export const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch()

  const handleNewTodo = (event: FormEvent) => {
    event.preventDefault();

    dispatch(add({
      newTodo,
    }))

    setNewTodo('')
  }

  return (
    <form onSubmit={handleNewTodo}>
      <input
        type="text"
        placeholder="Nova To-do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};
