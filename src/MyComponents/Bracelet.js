import React, { useState ,useEffect} from 'react';
import braceletRing from './images/ringbracelet.jpg';
import products from './products.json';
import ProductCard from './ProductCard'; // Import your custom card
import './Bracelet.css';
import { FaTruck, FaGem, FaUndoAlt } from 'react-icons/fa'

const braceletFilters = ["All", "Pendant", "Pearl", "Statement", "Initial", "Emerald"];

const Bracelet = ({ onLike, likedProducts }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Optional: Like feature handler (can connect to local state or backend)
  const handleLike = (product) => {
    console.log("Liked:", product.name);
    // Add logic to store liked items if needed
  };

  // Filter bracelet items based on subcategory filter
  const filteredProducts = products.filter(
    (product) =>
      product.category === "Bracelet" &&
      (selectedFilter === "All" || product.cato === selectedFilter)
  );

  return (
    <div className="bracelet-page">
      {/* Hero Image */}
      <div className="slideshow-container">
        <img src={braceletRing} alt="Bracelet Collection" className="slideshow-image" />
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
        {filteredProducts.map((product) => (
          <ProductCard
          key={product.id}
          product={product}
          onLike={onLike}
          likedProducts={likedProducts}
        />
        ))}
      </div>

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

export default Bracelet;
