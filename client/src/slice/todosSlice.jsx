import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Registered failed", error);
    return error;
  }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
});

export const AuthUser = createAsyncThunk("auth/user", async (currentToken) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const getTodos = createAsyncThunk("todos/todo/get", async (userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/todos/todo/get/${userId}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    return error;
  }
});

export const addTodo = createAsyncThunk(
  "todos/todo/create",
  async (todoData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/todo/create`,
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

export const updateTodo = createAsyncThunk(
  "todos/todo/update",
  async (updatedTodo) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/todo/update`,
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

export const checkBoxUpdate = createAsyncThunk(
  "todos/todo/checkBoxUpdate",
  async (updatedCheckedBox) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/todo/checkBoxUpdate`,
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

export const deleteTodo = createAsyncThunk(
  "todos/todo/deleteTodo",
  async (todoData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/todos/todo/deleteTodo`,
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
        state.todos = action.payload.data[0].todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload.data;

        const index = state.todos.findIndex(
          (todo) => todo._id == updatedTodo._id
        );

        if (index !== -1) {
          state.todos[index] = {
            ...state.todos[index],
            title: updatedTodo.title,
            checked: updatedTodo.checked,
          };
        }
      })
      .addCase(checkBoxUpdate.fulfilled, (state, action) => {
        const updatedCheckBox = action.payload.data;

        const index = state.todos.findIndex(
          (todo) => todo._id == updatedCheckBox._id
        );

        if (index !== -1) {
          state.todos[index] = {
            ...state.todos[index],
            checked: updatedCheckBox.checked,
          };
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const todoId = action.payload.data;

        state.todos = state.todos.filter((todo) => todo._id !== todoId);
      });
  },
});

export const { setToken, deleteToken } = todosSlice.actions;
export default todosSlice.reducer;
