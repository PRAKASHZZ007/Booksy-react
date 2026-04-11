import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = JSON.parse(localStorage.getItem("cartList")) || [];

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
      const item = action.payload;

      const existingItem = state.cartList.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList.push({ ...item, quantity: 1 });
      }

      saveCartToStorage(state.cartList);
    },

    increaseQuantity: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartList.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }

      saveCartToStorage(state.cartList);
    },

    decreaseQuantity: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartList.find(i => i.id === item.id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }

      saveCartToStorage(state.cartList);
    },

    deleteFromCart: (state, action) => {
      const item = action.payload;

      state.cartList = state.cartList.filter(i => i.id !== item.id);

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