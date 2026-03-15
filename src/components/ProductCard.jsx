import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const isInCart = cartItems.some(item => item.id === product.id);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  // Generate Review Stars
  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product.rating?.rate || 4);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"} />
      );
    }
    return <div className="flex text-sm">{stars}</div>;
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Wishlist Button - Absolute top right */}
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform text-red-500"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Image Container */}
      <div className="h-64 w-full p-6 flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-500">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col border-t border-gray-50">
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="text-xs text-gray-400">({product.rating?.count || Math.floor(Math.random() * 200)})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3 flex-1">{product.title}</h3>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">${product.discountedPrice || product.price}</span>
              {product.discountedPrice && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={isInCart ? (e) => e.preventDefault() : handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isInCart 
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-secondary text-white shadow-md shadow-blue-500/30 hover:bg-blue-700'
            }`}
          >
            {isInCart ? (
              <>
                <FaCheck /> Added
              </>
            ) : (
              <>
                <FaShoppingCart /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
