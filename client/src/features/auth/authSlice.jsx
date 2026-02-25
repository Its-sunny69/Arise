import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_SERVER_URL;


// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData?.email || !userData?.password || !userData?.username) {
        return rejectWithValue({
          message: "Email, username, and password are required",
        });
      }

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data || { message: "Registration failed. Please try again." },
        );
      }

      // Save token to localStorage
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);


// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData?.email || !userData?.password) {
        return rejectWithValue({
          message: "Email and password are required",
        });
      }

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data || { message: "Login failed. Please check your credentials." },
        );
      }

      // Save token to localStorage
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);


// Fetch current authenticated user
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (currentToken, { rejectWithValue }) => {
    try {
      if (!currentToken) {
        return rejectWithValue({ message: "No token provided" });
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Clear invalid token
        localStorage.removeItem("token");
        return rejectWithValue(
          data || { message: "Failed to fetch user. Please login again." },
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Logout user - clear token and user data
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = "idle";
      localStorage.removeItem("token");
    },

    
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    
    // Set token manually (e.g., from persistent storage)
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // Register thunk handlers
    builder
      .addCase(register.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload?.data?.user;
        state.token = action.payload?.data?.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Registration failed";
        state.user = null;
      });

    // Login thunk handlers
    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload?.data?.user;
        state.token = action.payload?.data?.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Login failed";
        state.user = null;
        state.token = null;
      });

    // Fetch user thunk handlers
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || "Failed to fetch user";
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearError, setToken } = authSlice.actions;
export default authSlice.reducer;
