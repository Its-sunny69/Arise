import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./features/todosSlice"
import roomTodosReducers from "./features/roomTodosSlice"

export default configureStore({
    reducer:{
        todos: todosReducers,
        roomTodos: roomTodosReducers,
    }
})
