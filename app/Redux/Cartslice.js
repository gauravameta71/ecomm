"use client";
import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    remove(state, action) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const {add, remove} = cartSlice.actions;
export default cartSlice.reducer;