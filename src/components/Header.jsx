import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from 'react-icons/fa';
import { selectCartItemsCount } from '../store/slices/cartSlice';
import { setSearchQuery } from '../store/slices/productsSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartItemsCount);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    dispatch(setSearchQuery(value));
    
    // Redirect to home if searching from another page
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="bg-secondary text-white rounded-lg px-2 py-1">U</span>
          UrbanCart
        </Link>
        <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={localSearch}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow bg-gray-50 focus:bg-white"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/wishlist" className="relative text-gray-600 hover:text-secondary transition-colors">
            <FaHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-secondary transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium transition-colors">
            <FaUser />
            <span className="hidden sm:inline">{isAuthenticated ? 'Profile' : 'Login'}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
