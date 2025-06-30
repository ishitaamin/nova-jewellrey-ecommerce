import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './MyComponents/Navbar';
import Footer from './MyComponents/Footer';
import Home from './MyComponents/Home';
import Bracelet from './MyComponents/Bracelet';
import Ring from './MyComponents/Ring';
import Necklace from './MyComponents/Necklace';
import Mangalsutra from './MyComponents/Mangalsutra';
import Earring from './MyComponents/Earring';
import ProductPage from './MyComponents/Productpage';
import Login from './MyComponents/login';
import Signup from './MyComponents/signup';
import Like from './MyComponents/Like';
import Cart from './MyComponents/Cart';
import Checkout from './MyComponents/Checkout';
import Profile from './MyComponents/Profile';
import MyOrders from './MyComponents/Myorder';


// Data
import products from './MyComponents/products.json';

function App() {
  // -------------------- Like Functionality --------------------
  const [likedProducts, setLikedProducts] = useState(() => {
    const saved = localStorage.getItem('likedProducts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  const handleLike = (product) => {
    if (!isUserLoggedIn()) {
      alert("Please login to like items.");
      window.location.href = "/login";
      return;
    }
  
    setLikedProducts((prev) => {
      const isLiked = prev.some((p) => p.id === product.id);
      return isLiked ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };
  
  

  // -------------------- Cart Functionality --------------------
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    if (!isUserLoggedIn()) {
      alert("Please login to add to cart.");
      window.location.href = "/login";
      return;
    }
  
    if (!cart.some((p) => p.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  };
  

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };
  const isUserLoggedIn = () => {
    return !!localStorage.getItem('token');
  };
  const LoginRedirect = () => {
    useEffect(() => {
      alert("Please login to access this page.");
      window.location.href = "/login";
    }, []);
  
    return null;
  };
  
  
  // -------------------- Auth Route Handling --------------------
  const AppContent = () => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup','/profile'].includes(location.pathname);

    return (
      <>
        {!isAuthPage && <Navbar />}
        
        <Routes>
          <Route path="/" element={
            <Home products={products} likedProducts={likedProducts} onLike={handleLike} />
          } />
          
          {/* Category Routes */}
          <Route path="/bracelet" element={<Bracelet likedProducts={likedProducts} onLike={handleLike} />} />
          <Route path="/mangalsutra" element={<Mangalsutra likedProducts={likedProducts} onLike={handleLike} />} />
          <Route path="/necklace" element={<Necklace likedProducts={likedProducts} onLike={handleLike} />} />
          <Route path="/rings" element={<Ring likedProducts={likedProducts} onLike={handleLike} />} />
          <Route path="/earrings" element={<Earring likedProducts={likedProducts} onLike={handleLike} />} />

          {/* Product Page */}
          <Route path="/product/:productId" element={
            <ProductPage likedProducts={likedProducts} onLike={handleLike} onAddToCart={handleAddToCart} />
          } />

          {/* Cart & Checkout */}
          <Route path="/cart" element={
  isUserLoggedIn() ? (
    <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />
  ) : (
    <LoginRedirect />
  )
} />

<Route path="/checkout" element={
  isUserLoggedIn() ? (
    <Checkout cart={cart} onClearCart={handleClearCart} />
  ) : (
    <LoginRedirect />
  )
} />

          {/* Like / Wishlist */}
          <Route path="/like" element={
  isUserLoggedIn() ? (
    <Like likedProducts={likedProducts} onLike={handleLike} />
  ) : (
    <LoginRedirect />
  )
} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Profile */}
          <Route path="/profile" element={
  isUserLoggedIn() ? <Profile /> : <LoginRedirect />
} />
  <Route path="/orders" element={
  isUserLoggedIn() ? <MyOrders /> : <LoginRedirect />
} />

        </Routes>

        {!isAuthPage && <Footer />}
      </>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
