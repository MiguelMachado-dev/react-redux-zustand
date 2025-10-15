import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

// Com base no name ('todo') e nas chaves do reducers ('add'),
// ele cria o tipo da ação, como 'todo/add'. Você não precisa mais escrever isso.
const todoSlice = createSlice({
  name: "todo",
  initialState: ["Fazer café"],

  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo);
    },
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { add } = todoSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
