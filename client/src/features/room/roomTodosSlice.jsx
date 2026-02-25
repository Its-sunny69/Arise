import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Fetch room todos
export const getRoomTodos = createAsyncThunk(
  "todos/roomtodo/get",
  async (roomId, { rejectWithValue }) => {
    try {
      if (!roomId) {
        return rejectWithValue({ message: "Room ID is required" });
      }

      const response = await fetch(
        `${API_URL}/api/todos/roomtodo/get/${roomId}`,
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data || { message: "Failed to fetch room todos" },
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

// Add new room todo
export const addRoomTodo = createAsyncThunk(
  "todos/roomtodo/create",
  async (todoData, { rejectWithValue }) => {
    try {
      if (!todoData?.title || !todoData?.roomId) {
        return rejectWithValue({
          message: "Title and room ID are required",
        });
      }

      const response = await fetch(`${API_URL}/api/todos/roomtodo/create`, {
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

// Update room todo
export const updateRoomTodo = createAsyncThunk(
  "todos/roomtodo/update",
  async (updatedTodo, { rejectWithValue }) => {
    try {
      if (!updatedTodo?.todoId ) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/roomtodo/update`, {
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

// Update room todo checkbox
export const roomCheckBoxUpdate = createAsyncThunk(
  "todos/roomtodo/checkBoxUpdate",
  async (updatedCheckedBox, { rejectWithValue }) => {
    try {
      if (!updatedCheckedBox?.todoId) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(
        `${API_URL}/api/todos/roomtodo/checkBoxUpdate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCheckedBox),
        },
      );

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

// Delete room todo
export const deleteRoomTodo = createAsyncThunk(
  "todos/roomtodo/deleteTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      if (!todoData?.todoId) {
        return rejectWithValue({ message: "Todo ID is required" });
      }

      const response = await fetch(`${API_URL}/api/todos/roomtodo/deleteTodo`, {
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

// Update room todo completion status
export const completedUpdate = createAsyncThunk(
  "todos/roomtodo/completedUpdate",
  async (completeData, { rejectWithValue }) => {
    try {
      if (!completeData?.roomId || !completeData?.userId) {
        return rejectWithValue({ message: "Room ID and User ID are required" });
      }

      const response = await fetch(
        `${API_URL}/api/todos/roomtodo/completedUpdate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data || { message: "Failed to update completion status" },
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

const roomTodosSlice = createSlice({
  name: "roomTodos",
  initialState: {
    roomId: null,
    roomTodos: [],
    loading: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Reset room todos
    resetRoomTodos: (state) => {
      state.roomId = null;
      state.roomTodos = [];
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    // Get room todos
    builder
      .addCase(getRoomTodos.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getRoomTodos.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.roomId = action.payload?.data?.[0]?.roomId || null;
        state.roomTodos = action.payload?.data?.[0]?.todos || [];
        state.error = null;
      })
      .addCase(getRoomTodos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to fetch room todos";
        state.roomTodos = [];
      });

    // Add room todo
    builder
      .addCase(addRoomTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addRoomTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const newTodo = action.payload?.data?.todos;
        if (newTodo && Array.isArray(state.roomTodos)) {
          state.roomTodos.push(newTodo);
        }
        state.error = null;
      })
      .addCase(addRoomTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to create todo";
      });

    // Update room todo
    builder
      .addCase(updateRoomTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateRoomTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedTodo = action.payload?.data;
        if (updatedTodo && Array.isArray(state.roomTodos)) {
          const index = state.roomTodos.findIndex(
            (todo) => todo._id === updatedTodo._id,
          );
          if (index !== -1) {
            state.roomTodos[index].title = updatedTodo.title;
            state.roomTodos[index].checked = updatedTodo.checked;
          }
        }
        state.error = null;
      })
      .addCase(updateRoomTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to update todo";
      });

    // Room checkbox update
    builder
      .addCase(roomCheckBoxUpdate.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(roomCheckBoxUpdate.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedTodo = action.payload?.data;
        if (updatedTodo && Array.isArray(state.roomTodos)) {
          const index = state.roomTodos.findIndex(
            (todo) => todo._id === updatedTodo._id,
          );
          if (index !== -1) {
            state.roomTodos[index].checked = updatedTodo.checked;
          }
        }
        state.error = null;
      })
      .addCase(roomCheckBoxUpdate.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to update checkbox";
      });

    // Delete room todo
    builder
      .addCase(deleteRoomTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteRoomTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const todoId = action.payload?.data;
        if (todoId && Array.isArray(state.roomTodos)) {
          state.roomTodos = state.roomTodos.filter(
            (todo) => todo._id !== todoId,
          );
        }
        state.error = null;
      })
      .addCase(deleteRoomTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to delete todo";
      });

    // Completed update
    builder
      .addCase(completedUpdate.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(completedUpdate.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedTodo = action.payload?.data;
        if (updatedTodo && Array.isArray(state.roomTodos)) {
          const index = state.roomTodos.findIndex(
            (todo) => todo._id === updatedTodo._id,
          );
          if (index !== -1) {
            state.roomTodos[index].completed = updatedTodo.completed;
          }
        }
        state.error = null;
      })
      .addCase(completedUpdate.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.payload?.message || "Failed to update completion status";
      });
  },
});

export const { clearError, resetRoomTodos } = roomTodosSlice.actions;
export default roomTodosSlice.reducer;
