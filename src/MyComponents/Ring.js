import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Bracelet.css';
import { FaTruck, FaGem, FaUndoAlt } from 'react-icons/fa';

const braceletFilters = ["All", "1 Layer", "2 Layer"];

const Ring = ({ onLike, likedProducts }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [ringProducts, setRingProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRings = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        const allProducts = res.data;

        const filtered = allProducts.filter(
          (product) => product.category === "Ring"
        );
        setRingProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching rings:", err);
      }
    };

    fetchRings();
  }, []);

  // Apply selected filter
  const filteredProducts = ringProducts.filter(
    (product) =>
      selectedFilter === "All" || product.cato === selectedFilter
  );

  return (
    <div className="bracelet-page">
      {/* Hero Image */}
      <div className="slideshow-container">
        <img src={'/images/ringbracelet.jpg'} alt="Ring Collection" className="slideshow-image" />
      </div>

      <hr className="br" />
      <h3 className="title">Find Your Perfect Piece</h3>
      <hr className="br" />

      {/* Filter Tabs */}
      <div className="filter-tab-container">
        {braceletFilters.map((filter, index) => (
          <button
            key={index}
            className={`filter-tab ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={onLike}
              likedProducts={likedProducts}
            />
          ))
        ) : (
          <p>No rings found for this filter.</p>
        )}
      </div>

      {/* Feature Section */}
      <div className="feature-section">
        <div className="feature-item">
          <FaTruck className="feature-icon" />
          <h4>Free Shipping</h4>
          <p>On all orders above ₹999</p>
        </div>
        <div className="feature-item">
          <FaGem className="feature-icon" />
          <h4>Premium Quality</h4>
          <p>100% Authentic Jewelry</p>
        </div>
        <div className="feature-item">
          <FaUndoAlt className="feature-icon" />
          <h4>Easy Returns</h4>
          <p>7-day hassle-free return</p>
        </div>
      </div>
    </div>
  );
};

export default Ring;
