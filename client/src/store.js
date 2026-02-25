import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./features/todo/todosSlice"
import roomTodosReducers from "./features/room/roomTodosSlice"
import authReducers from "./features/auth/authSlice"
import roomReducers from "./features/room/roomSlice"

export default configureStore({
    reducer:{
        auth: authReducers,
        todos: todosReducers,
        roomTodos: roomTodosReducers,
        room: roomReducers,
    }
})
