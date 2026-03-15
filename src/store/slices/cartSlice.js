import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem('cartItems');
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    console.error("Could not load cart from local storage", e);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    const serialized = JSON.stringify(cart);
    localStorage.setItem('cartItems', serialized);
  } catch (e) {
    console.error("Could not save cart to local storage", e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItemsCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
