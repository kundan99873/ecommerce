import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice.js";
import userReducer from "./user/userSlice.js";
import userCartReducer from "./cart/userCartSlice.js";
import darkModeReducer from "./mode/darkModeSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    userCart: userCartReducer,
    darkMode: darkModeReducer,
  },
});
