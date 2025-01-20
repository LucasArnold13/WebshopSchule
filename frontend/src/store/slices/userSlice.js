import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    role: null, 
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
     // state.role = action.payload.role;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
