import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductCard.css";


const ProductCard = ({ product, onLike, likedProducts }) => {
  const isLiked = likedProducts?.some((p) => p.id === product.id);
  

  return (
    <div className="product-card">
      {/* Wrap image and name in Link */}
      <Link to={`/product/${product.id}`} className="product-link">
        <img
          src={`/images/${product.image}`} // ✅ Loads from public/images
          alt={product.name}
          className="product-image"
        />
      </Link>

      <h3 className="product-name">{product.name}</h3>

      <p className="product-price">
        <span className="discounted-price">₹{product.discountedPrice}</span>{" "}
        <span className="original-price">₹{product.price}</span>
      </p>
      <p className="product-rating">⭐ {product.rating}</p>
      <p className="product-stock">{product.stock} in stock</p>

      <div className="like-button-container">
        <button
          className="like-button"
          onClick={() => onLike(product)}
          aria-label="Wishlist"
        >
          <FaHeart className={`icon-h ${isLiked ? 'liked' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
