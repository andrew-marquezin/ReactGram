import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import userService from "../services/userService";
import type { UserType } from "../Types/apiTypes";

const initialState = {
  user: {} as UserType,
  error: null as string | null,
  loading: false,
  success: false,
  message: null as string | null,
};

export const profile = createAsyncThunk<UserType, void, { state: RootState }>(
  "user/profile",
  async (_, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;

    const data = (await userService.profile(null, token)) as UserType;
    return data;
  },
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (userData: FormData, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    const data = await userService.updateProfile(userData, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getUserDetails = createAsyncThunk(
  "user/getById",
  async (id: string, _thunkAPI) => {
    const data = await userService.getUserDetails(id);
    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Perfil atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = {} as UserType;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
