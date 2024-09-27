import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./features/todosSlice"

export default configureStore({
    reducer:{
        todos: todosReducers,
    }
})
