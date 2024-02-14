import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";

// Use either const or let to declare the store variable
const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
});

export default store;
