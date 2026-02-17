import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./features/todo/todosSlice"
import roomTodosReducers from "./features/room/roomTodosSlice"

export default configureStore({
    reducer:{
        todos: todosReducers,
        roomTodos: roomTodosReducers,
    }
})
