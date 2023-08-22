import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/reducer";

const store = configureStore({
  reducer: {
    shoppingCart: cartReducer,
  },
});

export default store;
