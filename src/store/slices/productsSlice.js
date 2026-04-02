import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = '/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      // Inject dummy fields into the fakestore data since they don't provide some fields needed
      const enhancedData = data.map(item => ({
        ...item,
        discountedPrice: parseFloat((item.price * 0.8).toFixed(2)),
        originalPrice: item.price,
        deliveryBy: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        units: Math.floor(Math.random() * 50) + 1,
        keyFeatures: [
          "100% Original Product",
          "Pay on delivery might be available",
          "Easy 30 days returns & exchanges available",
        ],
        paymentOptions: ["Credit Card", "UPI", "Cash On Delivery"]
      }));
      
      return enhancedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    categoriesStatus: 'idle',
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedCategory } = productsSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items, searchQuery, selectedCategory } = state.products;
  let filtered = items;
  
  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
  }
  
  return filtered;
};

export default productsSlice.reducer;
