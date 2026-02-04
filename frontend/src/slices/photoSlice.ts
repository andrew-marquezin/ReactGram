import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import photoService from "../services/photoService";
import type { PhotoType } from "../Types/apiTypes";

const initialState = {
  photos: [] as PhotoType[],
  photo: {} as PhotoType,
  error: "",
  success: false,
  loading: false,
  message: "",
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo: FormData, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id: string, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;

    const data = await photoService.getUserPhotos(id, token);
    return data;
  },
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id: string, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async ({ title, id }: { title: string; id: string }, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.user.token;

    const data = await photoService.updatePhoto({ title }, id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = "";
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.photo = {} as PhotoType;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = "";
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = "";
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.photo._id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.photo = {} as PhotoType;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = "";

        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.photo = {} as PhotoType;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
