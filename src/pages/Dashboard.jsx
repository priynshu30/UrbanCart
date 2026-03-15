import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, setSelectedCategory } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { status, categoriesStatus, categories, selectedCategory } = useSelector(state => state.products);
  const products = useSelector(state => state.products.items);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, categoriesStatus, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };

  // Filter products by search and category
  const filteredProducts = useSelector(state => {
    const { items, searchQuery, selectedCategory } = state.products;
    return items.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  });

  return (
    <div className="w-full">
      {/* Parallax Banner Section */}
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tight">Summer Collection</h1>
          <p className="text-lg md:text-2xl mb-8 font-light drop-shadow-md">Discover the latest trends in UrbanCart</p>
          <button className="bg-secondary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Shop Now!
          </button>
        </div>
      </section>

      {/* Info Section: What we sell */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary text-2xl">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-500">On all orders over $50. Track your shipments live.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary text-2xl">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Free Returns</h3>
              <p className="text-gray-500">30 days money-back guarantee. No questions asked.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary text-2xl">🎧</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-500">Our team is available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">Featured Products</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => handleCategoryClick('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'all' ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Products
          </button>
          {categories.map((cat, index) => (
            <button 
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-2 rounded-full font-medium capitalize transition-all ${selectedCategory === cat ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {status === 'loading' ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : status === 'failed' ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">Failed to load products. Please try again.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p>Try adjusting your search or category filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
