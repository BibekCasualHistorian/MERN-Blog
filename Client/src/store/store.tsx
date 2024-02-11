import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

// Use either const or let to declare the store variable
const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
