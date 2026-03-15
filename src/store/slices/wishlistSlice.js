import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const serialized = localStorage.getItem('wishlistItems');
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  } catch (e) {}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state.items);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
