import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  getProductDetails,
  removeFromCart,
  removeUserCart,
} from "../../api/apiService";

const initialState = {
  products: [],
  amount: 0,
};

export const getCartItem = createAsyncThunk("fetchUser", getCart);

export const addCartItem = createAsyncThunk("addCartItem", async (data) => {
  const response = await addToCart(data);
  return response;
});
export const removeCartItem = createAsyncThunk(
  "removeCartItem",
  async (data) => {
    const response = await removeFromCart(data);
    return response;
  }
);

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  removeUserCart
);

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    signOutCart: (state, action) => {
      state.amount = 0;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.fulfilled, (state, action) => {
        const data = [];
        action.payload.data.map((item) => {
          return data.push({
            title: item.title,
            category: item.category,
            image: item.image.url,
            price: item.price,
            quantity: item.quantity,
            id: item._id,
          });
        });
        (state.products = data), (state.amount = action.payload.cart.amount);
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const data = [];
        action.payload.data.map((item) => {
          return data.push({
            title: item.title,
            category: item.category,
            image: item.image.url,
            price: item.price,
            quantity: item.quantity,
            id: item._id,
          });
        });
        (state.products = data), (state.amount = action.payload.cart.amount);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        console.log(action);
        const data = [];
        action.payload.data.map((item) => {
          return data.push({
            title: item.title,
            category: item.category,
            image: item.image.url,
            price: item.price,
            quantity: item.quantity,
            id: item._id,
          });
        });
        (state.products = data), (state.amount = action.payload.cart.amount);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        (state.products = []), (state.amount = 0);
      });
  },
});

export const { signOutCart } = cartSlice.actions;

export default cartSlice.reducer;
