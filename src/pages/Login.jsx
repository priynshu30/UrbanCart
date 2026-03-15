import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, logout } from '../store/slices/authSlice';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">{user?.email}</p>
          <button 
            onClick={() => dispatch(logout())}
            className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors mb-4"
          >
            Logout
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login({ email: formData.email }));
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-gray-100">
        
        {/* Banner Side */}
        <div className="bg-primary text-white p-12 flex flex-col justify-center hidden md:flex relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Join Premium<br/>Shopping.</h2>
            <p className="text-xl text-gray-300 font-light mb-8">Login to access your wishlist, track orders, and experience lightning-fast checkouts.</p>
            <div className="space-y-4 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary">✓</span> Curated Quality</div>
              <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary">✓</span> Priority Shipping</div>
              <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary">✓</span> Exclusive Offers</div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors ${errors.email ? 'border-red-500 bg-red-50 relative z-10' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors ${errors.password ? 'border-red-500 bg-red-50 relative z-10' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-secondary focus:ring-secondary w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-secondary hover:underline">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-lg mt-2"
            >
              Sign In
            </button>
          </form>
          
          <p className="text-center text-gray-600 text-sm mt-8 relative">
            <span className="bg-white px-4 relative z-10">Don't have an account?</span>
            <span className="absolute left-0 top-1/2 w-full h-[1px] bg-gray-200 -z-0"></span>
          </p>
          <div className="text-center mt-4 text-sm">
            <a href="#" className="font-semibold text-secondary hover:underline">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
