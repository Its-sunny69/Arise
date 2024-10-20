import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("user registered successfully", data);
      return data;
    } else {
      const errorData = await response.json();
      // console.error("registration error", errorData); // log backend error to console
      return errorData;
    }
  } catch (error) {
    console.error("Registered failed", error);
    return error
  }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("login", data);
      return data;
    } else {
      const errorData = await response.json();
      // console.error("login error", errorData); // log backend error to console
      return errorData;
    }
  } catch (error) {
    // console.error("Login request failed", error); // Catch and log fetch errors
    return error;
  }
});

export const AuthUser = createAsyncThunk("auth/user", async (currentToken) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const getTodos = createAsyncThunk("todos/todo/get", async (userId) => {
  console.log("slice", userId)
  const response = await fetch(`http://localhost:5000/api/todos/todo/get/${userId}`);
  return response.json();
});

export const addTodo = createAsyncThunk("todos/todo/post", async (todoData) => {
  const response = await fetch("http://localhost:5000/api/todos/todo/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  return response.json();
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updatedTodo }) => {
    const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
);

export const checkBoxUpdate = createAsyncThunk(
  "todos/checkBoxUpdate",
  async ({ id, currentChecked }) => {
    const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checked: !currentChecked,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return { id: id, data: data };
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    deleteToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload[0].todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload.updatedTodoFromDB._id
        );

        if (index !== -1) {
          state.todos[index] = action.payload.updatedTodoFromDB;
        }
      })
      .addCase(checkBoxUpdate.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload.updatedTodoFromDB._id
        );

        if (index !== -1) {
          state.todos[index].checked = action.payload.updatedTodoFromDB.checked;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload.id
        );
      });
  },
});

export const { setToken, deleteToken } = todosSlice.actions;
export default todosSlice.reducer;
