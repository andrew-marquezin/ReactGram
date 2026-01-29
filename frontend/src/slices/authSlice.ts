import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import type { RegisterUserType } from "../Types/apiTypes";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState = {
  user: user ? user : null,
  error: null as string | null,
  success: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: RegisterUserType, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
