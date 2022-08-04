import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/user/user";

export default configureStore({
  reducer: {
    user: UserReducer,
  },
});
