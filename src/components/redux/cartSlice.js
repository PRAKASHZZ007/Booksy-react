import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const cartFromStorage = JSON.parse(localStorage.getItem("cartList")) || [];

// Save cart to localStorage helper
const saveCartToStorage = (cartList) => {
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: cartFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartList.find(
        item => item.isbn13 === action.payload.isbn13
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList.push({ ...action.payload, quantity: 1 });
      }

      saveCartToStorage(state.cartList);
    },

    increaseQuantity: (state, action) => {
      state.cartList = state.cartList.map(item =>
        item.isbn13 === action.payload.isbn13
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      saveCartToStorage(state.cartList);
    },

    decreaseQuantity: (state, action) => {
      state.cartList = state.cartList.map(item =>
        item.isbn13 === action.payload.isbn13 && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      saveCartToStorage(state.cartList);
    },

    deleteFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        item => item.isbn13 !== action.payload.isbn13
      );

      saveCartToStorage(state.cartList);
    },

    resetCart: (state) => {
      state.cartList = [];
      saveCartToStorage([]);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
