import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRoomTodos = createAsyncThunk(
  "todos/roomtodo/get",
  async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/roomtodo/get/${roomId}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("roomdata-fetch", data)
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      return error;
    }
  }
);

export const addRoomTodo = createAsyncThunk(
  "todos/roomtodo/create",
  async (todoData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/todos/roomtodo/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Updated RoomTodo", data);
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      return error;
    }
  }
);

export const updateRoomTodo = createAsyncThunk(
  "todos/roomtodo/update",
  async (updatedTodo) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/roomtodo/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Updated RoomTodo", data);
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      return error;
    }
  }
);

export const roomCheckBoxUpdate = createAsyncThunk(
  "todos/roomtodo/checkBoxUpdate",
  async (updatedCheckedBox) => {
    try {
      // console.log("redux fn", updatedCheckedBox);
      const response = await fetch(
        `http://localhost:5000/api/todos/roomtodo/checkBoxUpdate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCheckedBox),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log("Updated RoomCheckbox", data);
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      return error;
    }
  }
);

export const deleteRoomTodo = createAsyncThunk(
  "todos/roomtodo/deleteTodo",
  async (todoData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/roomtodo/deleteTodo`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Deleted RoomTodo", data);
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      return error;
    }
  }
);

const roomTodosSlice = createSlice({
  name: "roomTodos",
  initialState: {
    roomId: null,
    roomTodos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomTodos.fulfilled, (state, action) => {
        state.roomId = action.payload.data[0].roomId;
        state.roomTodos = action.payload.data[0].todos;
        console.log("roomTodos-redux", state.roomTodos);
      })
      .addCase(addRoomTodo.fulfilled, (state, action) => {
        state.roomTodos.push(action.payload);
      })
      .addCase(updateRoomTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload.data;

        const index = state.roomTodos.findIndex(
          (todo) => todo._id == updatedTodo._id
        );
        if (index !== -1) {
          state.roomTodos[index] = {
            ...state.roomTodos[index],
            title: updatedTodo.title,
            checked: updatedTodo.checked,
          };
        }
      })
      .addCase(deleteRoomTodo.fulfilled, (state, action) => {
        const todoId = action.payload.data;

        state.roomTodos = state.roomTodos.filter((todo) => todo._id !== todoId);
      });
  },
});

export default roomTodosSlice.reducer;
