# UrbanCart - Premium E-Commerce Platform 🛒

UrbanCart is a modern, responsive Single Page Application (SPA) e-commerce front-end focused on delivering a premium shopping experience. It features dynamic product fetching, category filtering, a persistent shopping cart and wishlist, and simulated user authentication.

## 🚀 Live Demonstration
The application is pre-configured for automatic deployments. 
- You can deploy directly to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) using the included `vercel.json` and `netlify.toml` configurations.

## ✨ Key Features
- **Dynamic Product Data**: Integrates with the [Fake Store API](https://fakestoreapi.com/) to fetch products and categories dynamically.
- **Advanced State Management**: Utilizes Redux Toolkit and Redux Thunks for seamless asynchronous data flow and centralized state.
- **Persistent Storage**: Cart and Wishlist data is seamlessly synced with `localStorage`, ensuring items remain even after a page refresh.
- **Search & Filtering**: Real-time fuzzy search by product name and immediate category-based filtration.
- **Responsive & Premium Design**: Built with Tailwind CSS, featuring a curated color palette, glassmorphism UI elements, micro-animations, and a fully responsive grid system.
- **Simulated Authentication**: Secure login flow with form validation for email addresses and password lengths.

## 🛠️ Technology Stack
- **Framework**: React 18 (Bootstrapped with Vite)
- **Routing**: React Router DOM (v6)
- **State Management**: Redux, React-Redux, Redux Toolkit
- **Styling**: Tailwind CSS (v3)
- **Icons**: React Icons
- **Testing**: Vitest + React Testing Library + JSDOM

## 📂 Project Structure
```
src/
├── components/   # Reusable UI components (Header, Footer, ProductCard)
├── pages/        # Main route views (Dashboard, ProductDetail, Cart, Wishlist, Login)
├── store/        # Redux store configuration and state slices
├── assets/       # Static assets and images
├── App.jsx       # Main application component & Router wrapper
└── main.jsx      # React entry point & Redux Provider
```

## 💻 Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone this repository:
```bash
git clone https://github.com/priynshu30/UrbanCart.git
cd UrbanCart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Testing
The project includes unit tests for critical components (like `ProductCard.jsx`) using Vitest.
To run the tests:
```bash
npm run test
```

### Production Build
To create an optimized production build:
```bash
npm run build
```

## 🤝 Contribution Details
This project was built following strict frontend guidelines focusing on component architecture, state management efficiency, scalable project directories, and seamless user experiences.

---
*Created as a comprehensive e-commerce React case study.*
