import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.err = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        const index = state.currentVideo.disLikes.findIndex(
          (userId) => userId === action.payload
        );

        if (index >= 0) {
          state.currentVideo.disLikes.splice(index, 1);
        }
      }
    },
    disLike: (state, action) => {
      if (!state.currentVideo.disLikes.includes(action.payload)) {
        state.currentVideo.disLikes.push(action.payload);
        const index = state.currentVideo.likes.findIndex(
          (userId) => userId === action.payload
        );

        if (index >= 0) {
          state.currentVideo.likes.splice(index, 1);
        }
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, disLike } =
  videoSlice.actions;
export default videoSlice.reducer;
