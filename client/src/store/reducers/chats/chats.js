import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
    clearChats: (state) => {
      state.chats = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats, clearChats } = chatsSlice.actions;

export default chatsSlice.reducer;
