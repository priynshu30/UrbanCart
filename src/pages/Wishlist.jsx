import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const wishlistItems = useSelector(state => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-red-50 text-red-300 rounded-full flex items-center justify-center mb-6">
          <FaHeartBroken size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Save items you love in your wishlist. Review them anytime and easily move them to cart.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all hover:shadow-lg">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">My Wishlist</h1>
          <p className="text-gray-500">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
