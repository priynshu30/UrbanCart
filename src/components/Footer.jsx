import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="bg-secondary text-white rounded-lg px-2 py-1 text-sm">U</span>
            UrbanCart
          </h3>
          <p className="text-gray-400 text-sm">
            Your one-stop destination for all your premium shopping needs. We provide high-quality products with exceptional customer service.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/cart" className="hover:text-secondary transition-colors">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-secondary transition-colors">Wishlist</Link></li>
            <li><Link to="/login" className="hover:text-secondary transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@urbancart.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Commerce St, NY 10001</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full text-gray-900 rounded-l-md focus:outline-none" />
            <button className="bg-secondary px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} UrbanCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
