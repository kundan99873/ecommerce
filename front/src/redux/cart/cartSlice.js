import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  amount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let data = state.product.find((e) => e.id == action.payload.product.id);
      if (data) {
        let index = state.product.findIndex(
          (e) => e.id == action.payload.product.id
        );
        return void ((state.product[index] = {
          ...data,
          quantity: data.quantity + 1,
        }),
        (state.amount += action.payload.amount));
      } else {
        state.product.push(action.payload.product);
        state.amount += action.payload.amount;
      }
    },
    removeFromCart: (state, action) => {
      let data = state.product.find((e) => e.id == action.payload.product.id);
      if (data) {
        let index = state.product.findIndex(
          (e) => e.id == action.payload.product.id
        );
        return void ((state.product[index] = {
          ...data,
          quantity: data.quantity - 1,
        }),
        (state.amount -= action.payload.amount));
      }
    },
    deleteFromCart: (state, action) => {
      let product = state.product.filter(
        (item) => item.id !== action.payload.id
      );
      state.product = product;
      state.amount -= action.payload.amount;
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
