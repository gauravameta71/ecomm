
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/app/Redux/Cartslice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export default store;
