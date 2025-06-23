import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productList from "./products.json";
import "./ProductPage.css";
import ProductCard from "./ProductCard";
import { FaTruck, FaGem, FaUndoAlt } from 'react-icons/fa';

const ProductPage = ({ onLike, likedProducts, onAddToCart }) => {
  const { productId } = useParams();
  const productData = productList.find((p) => p.id === Number(productId));
  const isLiked = likedProducts?.some((p) => p.id === productData.id);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productData) setSelectedImage(productData.image);
  }, [productData]);

  if (!productData) return <div>Product not found.</div>;

  return (
    <div>
      <div className="product-page">
        <div className="product-gallery">
          <div className="thumbnails">
            {[...productData.images, productData.image].map((img, index) => (
              <img
                key={index}
                src={require(`./images/${img}`)}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="main-image">
            {selectedImage && <img src={require(`./images/${selectedImage}`)} alt="main" />}
          </div>
        </div>

        <div className="product-info">
          <h2>{productData.name}</h2>
          <div className="pricing">
            <span className="original-price">₹{productData.price}</span>
            <span className="discounted-price">₹{productData.discountedPrice}</span>
            <span className="discount-off">
              ({Math.round(((productData.price - productData.discountedPrice) / productData.price) * 100)}% OFF)
            </span>
          </div>

          <p className="product-description">{productData.description}</p>

          <ul className="product-details">
            {productData.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>

          <div className="buttons">
            <div className="btn-row">
              <button className="btn-cart" onClick={() => onAddToCart(productData)}>Add to Cart</button>
              <button
                className={`btn-wishlist ${isLiked ? 'liked' : ''}`}
                onClick={() => onLike(productData)}
              >
                {isLiked ? '❤️ ' : '🤍'}
              </button>
            </div>
            <button
              className="btn-buy"
              onClick={() => {
                localStorage.setItem('checkoutItem', JSON.stringify(productData));
                localStorage.setItem('checkoutMode', 'buyNow');
                window.location.href = '/checkout';
              }}
            >
              Buy it Now
            </button>
          </div>
        </div>
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

      <h3 className="title2">Related Products</h3>
      <div className="product-grid">
        {productList.filter(
          (p) => p.id !== productData.id &&
            p.category === productData.category &&
            p.subCategory === productData.subCategory &&
            p.cato === productData.cato
        ).slice(0, 10).map((relatedProduct) => (
          <ProductCard
            key={relatedProduct.id}
            product={relatedProduct}
            onLike={onLike}
            likedProducts={likedProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;