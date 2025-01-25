import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    isAuthenticated: false,
    firstname: null,
    lastname: null,
    email: null,
    id : null, 
  },
  reducers: {
    customerLogin(state, action) {
      state.isAuthenticated = true;
      state.firstname = action.payload.customer.firstname;
      state.lastname = action.payload.customer.lastname;
      state.email = action.payload.customer.email;
      state.id = action.payload.customer.id;
    },

    customerLogout(state) {
        state.isAuthenticated= false;
        state.firstname= null;
        state.lastname= null;
        state.email= null;
        state.id = null;
    },
  },
});

export const { customerLogin, customerLogout } = customerSlice.actions;
export default customerSlice.reducer;
