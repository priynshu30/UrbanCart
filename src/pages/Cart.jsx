import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { removeFromCart, updateQuantity, selectCartTotal, clearCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);

  const handleQuantity = (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center mb-6">
          <FaShoppingCart size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium products now.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all hover:shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Cart Items ({cartItems.length})</h2>
              <button 
                onClick={() => dispatch(clearCart())}
                className="text-red-500 text-sm hover:underline font-medium"
              >
                Clear Cart
              </button>
            </div>
            
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors">
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-24 h-24 object-contain bg-white rounded-lg p-2 border border-gray-200"
                    />
                  </Link>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-secondary line-clamp-1 text-lg mb-1">
                      {item.title}
                    </Link>
                    <p className="text-gray-500 text-sm mb-3">Unit Price: <span className="font-medium text-gray-700">${item.discountedPrice || item.price}</span></p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <button 
                          onClick={() => handleQuantity(item.id, item.quantity, -1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-1 font-medium text-gray-900 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantity(item.id, item.quantity, 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-gray-900">
                      ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5">
              Proceed to Checkout <FaArrowRight />
            </button>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Secure Checkout Powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
