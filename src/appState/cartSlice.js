import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../dummyData/cartData";

// https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
const URL = "https://mocki.io/v1/1d3300ce-ed01-4d7b-b475-17eb1acb928c";

const initialState = {
  // cart is an array of objects
  cartitems: cartItems,
  amount: 0,
  total: 0,
  isLoading: false,
  error: null,
};

// createAsyncThunk is a function that accepts an action type string and a payload creator function
// https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await fetch(URL);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return "error";
    }
    console.log(data)
    //make array of objects
    console.log(Object.entries(data))
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    clearCart: (state, action) => {
      state.cartitems.length = 0;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartitems = state.cartitems.filter((item) => item.id !== id);
    },
    increaseAmount: (state, action) => {
      const id = action.payload;
      state.cartitems.forEach((item) => {
        if (item.id === id) {
          item.amount++;
        }
      });
    },
    decreaseAmount: (state, action) => {
      const id = action.payload;
      state.cartitems.forEach((item) => {
        // you can't have negative amounts
        // you can save some code by adding this if statements directly in the onClick function in the CartItem component <ChevronUp/>
        // if (amount === 1) => removerItem
        // if (amount > 1) => decreaseAmount
        // i thhink this is the best way to do it
        // but at the end all roads lead to rome :)

        if (item.id === id) {
          if (item.amount > 0) {
            item.amount--;
          }
          if (item.amount < 1) {
            state.cartitems = state.cartitems.filter((item) => item.id !== id);
          }
        }
      });
    },
    itemesAmount: (state, action) => {
      let amount = 0;
      let total = 0;
      state.cartitems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.total = parseFloat(total).toFixed(2);
      state.amount = amount;
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [fetchCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});
// export xlear cart
export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  itemesAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
