import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const getCreatedRooms = createAsyncThunk(
  "rooms/getCreatedRooms",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue({ message: "User ID is required" });
      }

      const response = await fetch(`${API_URL}/api/rooms/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to fetch created rooms" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

export const getJoinedRooms = createAsyncThunk(
  "rooms/getJoinedRooms",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue({ message: "User ID is required" });
      }

      const response = await fetch(`${API_URL}/api/rooms/join/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to fetch joined rooms" });
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      if (!roomId) {
        return rejectWithValue({ message: "Room ID is required" });
      }

      const response = await fetch(`${API_URL}/api/rooms/${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to delete room" });
      }

      return { roomId, data };
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error. Please try again.",
      });
    }
  },
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    createdRooms: [],
    joinedRooms: [],
    createdRoomsLoading: "pending",
    joinedRoomsLoading: "pending",
    deleteRoomLoading: "idle",
    error: null,
  },
  reducers: {
    clearRoomError: (state) => {
      state.error = null;
    },

    removeJoinedRoomById: (state, action) => {
      const roomId = action.payload;
      state.joinedRooms = state.joinedRooms.filter((room) => room.roomId !== roomId);
    },

    removeDeletedRoom: (state, action) => {
      const roomId = action.payload;
      state.createdRooms = state.createdRooms.filter((room) => room.roomId !== roomId);
      state.joinedRooms = state.joinedRooms.filter((room) => room.roomId !== roomId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCreatedRooms.pending, (state) => {
        state.createdRoomsLoading = "pending";
        state.error = null;
      })
      .addCase(getCreatedRooms.fulfilled, (state, action) => {
        state.createdRoomsLoading = "succeeded";
        state.createdRooms = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(getCreatedRooms.rejected, (state, action) => {
        state.createdRoomsLoading = "failed";
        state.createdRooms = [];
        state.error = action.payload?.message || "Failed to fetch created rooms";
      })
      .addCase(getJoinedRooms.pending, (state) => {
        state.joinedRoomsLoading = "pending";
        state.error = null;
      })
      .addCase(getJoinedRooms.fulfilled, (state, action) => {
        state.joinedRoomsLoading = "succeeded";
        state.joinedRooms = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(getJoinedRooms.rejected, (state, action) => {
        state.joinedRoomsLoading = "failed";
        state.joinedRooms = [];
        state.error = action.payload?.message || "Failed to fetch joined rooms";
      })
      .addCase(deleteRoom.pending, (state) => {
        state.deleteRoomLoading = "pending";
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.deleteRoomLoading = "succeeded";
        const roomId = action.payload?.roomId;
        if (!roomId) {
          return;
        }
        state.createdRooms = state.createdRooms.filter((room) => room.roomId !== roomId);
        state.joinedRooms = state.joinedRooms.filter((room) => room.roomId !== roomId);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.deleteRoomLoading = "failed";
        state.error = action.payload?.message || "Failed to delete room";
      });
  },
});

export const { clearRoomError, removeJoinedRoomById, removeDeletedRoom } = roomSlice.actions;
export default roomSlice.reducer;