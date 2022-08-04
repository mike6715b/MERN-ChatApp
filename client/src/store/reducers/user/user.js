import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, setError, setLoading, setUser } = userSlice.actions;

export default userSlice.reducer;
