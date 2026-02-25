import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Fetch user todos
export const getTodos = createAsyncThunk(
  "todos/todo/get",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue({ message: "User ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/todo/get/${userId}`);

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to fetch todos" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

// Add new todo
export const addTodo = createAsyncThunk(
  "todos/todo/create",
  async (todoData, { rejectWithValue }) => {
    try {
      if (!todoData?.title) {
        return rejectWithValue({ message: "Todo title is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/todo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to create todo" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

// Update todo
export const updateTodo = createAsyncThunk(
  "todos/todo/update",
  async (updatedTodo, { rejectWithValue }) => {
    try {
      if (!updatedTodo?.todoId) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/todo/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to update todo" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

// Update todo checkbox
export const checkBoxUpdate = createAsyncThunk(
  "todos/todo/checkBoxUpdate",
  async (updatedCheckedBox, { rejectWithValue }) => {
    try {
      if (!updatedCheckedBox?.todoId) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/todo/checkBoxUpdate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCheckedBox),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data || { message: "Failed to update checkbox" },
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

// Delete todo
export const deleteTodo = createAsyncThunk(
  "todos/todo/deleteTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      if (!todoData?.todoId) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/todo/deleteTodo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to delete todo" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Reset todos
    resetTodos: (state) => {
      state.todos = [];
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    // Get todos
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.todos = action.payload?.data?.[0]?.todos || [];
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to fetch todos";
        state.todos = [];
      });

    // Add todo
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const newTodo = action.payload?.data;
        if (newTodo) {
          state.todos.push(newTodo);
        }
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to create todo";
      });

    // Update todo
    builder
      .addCase(updateTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        console.log("updateTodo.fulfilled - payload:", action.payload);
        const updatedTodo = action.payload?.data;
        if (updatedTodo && Array.isArray(state.todos)) {
          const index = state.todos.findIndex(
            (todo) => todo._id === updatedTodo._id,
          );
          if (index !== -1) {
            state.todos[index] = {
              ...state.todos[index],
              title: updatedTodo.title,
              checked: updatedTodo.checked,
            };
          }
        }
        state.error = null;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to update todo";
      });

    // Checkbox update
    builder
      .addCase(checkBoxUpdate.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(checkBoxUpdate.fulfilled, (state, action) => {
        state.loading = "succeeded";
        console.log("checkBoxUpdate.fulfilled - payload:", action.payload);
        const updatedCheckBox = action.payload?.data;
        if (updatedCheckBox && Array.isArray(state.todos)) {
          const index = state.todos.findIndex(
            (todo) => todo._id === updatedCheckBox._id,
          );
          if (index !== -1) {
            state.todos[index].checked = updatedCheckBox.checked;
          }
        }
        state.error = null;
      })
      .addCase(checkBoxUpdate.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to update checkbox";
      });

    // Delete todo
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const todoId = action.payload?.data;
        if (todoId && Array.isArray(state.todos)) {
          state.todos = state.todos.filter((todo) => todo._id !== todoId);
        }
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to delete todo";
      });
  },
});

export const { clearError, resetTodos } = todosSlice.actions;
export default todosSlice.reducer;
