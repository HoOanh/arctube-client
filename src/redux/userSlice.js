import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.err = true;
    },
    logout: (state) => {
      return initialState;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUser.includes(action.payload)) {
        state.currentUser.subscribedUser.splice(
          state.currentUser.subscribedUser.findIndex(
            (chanelId) => chanelId === action.payload
          )
        );
      } else {
        state.currentUser.subscribedUser.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
