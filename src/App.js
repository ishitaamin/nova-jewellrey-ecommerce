import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './MyComponents/Navbar';
import Home from './MyComponents/Home';
import Footer from './MyComponents/Footer';
import Bracelet from './MyComponents/Bracelet';
import Ring from './MyComponents/Ring';
import Necklace from './MyComponents/Necklace';
import Mangalsutra from './MyComponents/Mangalsutra';
import Earring from './MyComponents/Earring';
import ProductPage from './MyComponents/Productpage';
import Login from './MyComponents/login';
import Signup from './MyComponents/signup';
import Like from './MyComponents/Like';
import products from './MyComponents/products.json';

function App() {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      setLikedProducts(JSON.parse(savedLikes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  const handleLike = (product) => {
    const alreadyLiked = likedProducts.some((p) => p.id === product.id);
    if (alreadyLiked) {
      setLikedProducts(likedProducts.filter((p) => p.id !== product.id));
    } else {
      setLikedProducts([...likedProducts, product]);
    }
  };

  const AppContent = () => {
    const location = useLocation();
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

    return (
      <>
        {!isAuthRoute && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                likedProducts={likedProducts}
                onLike={handleLike}
              />
            }
          />
          <Route path="/bracelet" element={<Bracelet likedProducts={likedProducts}onLike={handleLike}/>} />
          <Route path="/mangalsutra" element={<Mangalsutra  likedProducts={likedProducts}onLike={handleLike}/>} />
          <Route path="/necklace" element={<Necklace likedProducts={likedProducts}onLike={handleLike}/>} />
          <Route path="/rings" element={<Ring likedProducts={likedProducts}onLike={handleLike}/>} />
          <Route path="/earrings" element={<Earring likedProducts={likedProducts}onLike={handleLike}/>} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route
            path="/like"
            element={
              <Like
                likedProducts={likedProducts}
                onLike={handleLike}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {!isAuthRoute && <Footer />}
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
