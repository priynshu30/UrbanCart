import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { items, status } = useSelector(state => state.products);
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  const product = items.find(p => p.id === parseInt(id));
  const isInCart = cartItems.some(item => item.id === parseInt(id));
  const isWishlisted = wishlistItems.some(item => item.id === parseInt(id));

  useEffect(() => {
    if (items.length === 0 && status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-secondary hover:underline flex items-center justify-center gap-2">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 truncate w-32 md:w-auto">{product.title}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          
          {/* Product Image Section */}
          <div className="relative flex items-center justify-center bg-gray-50 rounded-xl p-8 min-h-[400px]">
            <button 
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md text-red-500 hover:scale-110 transition-transform"
            >
              {isWishlisted ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[400px] object-contain hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(product.rating?.rate || 4) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-secondary font-medium">{product.rating?.count || 120} Reviews</span>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold text-gray-900">${product.discountedPrice || product.price}</span>
                {product.discountedPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
                    <span className="text-green-600 font-bold mb-1 text-lg">20% OFF</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              {isInCart ? (
                <Link to="/cart" className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold text-lg text-center shadow-lg shadow-green-500/30 hover:bg-green-700 transition-colors">
                  Go to Cart
                </Link>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:bg-gray-800 transition-colors"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              )}
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Extra Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <FaTruck className="text-secondary text-xl mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Delivery</h4>
                  <p className="text-gray-600">Expected by <span className="font-semibold text-gray-800">{product.deliveryBy}</span></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-secondary text-xl mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Stock Status</h4>
                  <p className={`${product.units > 10 ? 'text-green-600' : 'text-orange-500'} font-semibold`}>
                    {product.units} Units Available
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.keyFeatures?.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Payment Options</h4>
              <div className="flex gap-4 text-sm text-gray-600">
                {product.paymentOptions?.map((opt, i) => (
                  <span key={i} className="bg-white px-3 py-1 rounded shadow-sm border border-gray-100">{opt}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
