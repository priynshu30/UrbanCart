import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ProductCard from './ProductCard';
import cartReducer from '../store/slices/cartSlice';
import wishlistReducer from '../store/slices/wishlistSlice';

const mockProduct = {
  id: 1,
  title: "Test Urban Sneaker",
  price: 120,
  discountedPrice: 99,
  image: "test-image.jpg",
  category: "shoes",
  rating: { rate: 4.5, count: 12 }
};

const renderWithProviders = (ui) => {
  const testStore = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    preloadedState: {
      cart: { items: [] },
      wishlist: { items: [] }
    }
  });

  return render(
    <Provider store={testStore}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Urban Sneaker')).toBeInTheDocument();
    expect(screen.getByText('shoes')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('displays Add action initially', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});
