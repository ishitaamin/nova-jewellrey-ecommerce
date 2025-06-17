import React from 'react';
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



function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bracelet" element={<Bracelet />} />
        <Route path="/mangalsutra" element={<Mangalsutra />} />
        <Route path="/necklace" element={<Necklace />} />
        <Route path="/rings" element={<Ring />} />
        <Route path="/earrings" element={<Earring />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        
      </Routes>
      {!isAuthRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
