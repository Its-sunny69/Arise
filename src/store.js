import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./slice/todosSlice"
import roomTodosReducers from "./slice/roomTodosSlice"

export default configureStore({
    reducer:{
        todos: todosReducers,
        roomTodos: roomTodosReducers,
    }
})
