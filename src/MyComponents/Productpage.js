import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ProductPage.css";
import ProductCard from "./ProductCard";
import { FaTruck, FaGem, FaUndoAlt } from 'react-icons/fa';

const ProductPage = ({ onLike, likedProducts, onAddToCart }) => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const isLiked = likedProducts?.some((p) => p._id === productData?._id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        const all = res.data;
        const single = all.find(p => p._id === productId || p.id === Number(productId)); // handle _id (Mongo) or id (local)
        setProductData(single);
        setAllProducts(all);
        if (single) setSelectedImage(single.image);
      } catch (err) {
        console.error("❌ Error loading product:", err);
      }
    };

    fetchData();
  }, [productId]);

  if (!productData) return <div>Product not found.</div>;

  const related = allProducts.filter(
    (p) =>
      (p._id || p.id) !== (productData._id || productData.id) &&
      p.category === productData.category &&
      p.subcategory === productData.subcategory &&
      p.cato === productData.cato
  ).slice(0, 10);

  return (
    <div>
      <div className="product-page">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="thumbnails">
            {[...(productData.images || []), productData.image].map((img, index) => (
              <img
                key={index}
                src={`/images/${img}`} // from public folder
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              />
            ))}
          </div>
          <div className="main-image">
            {selectedImage && <img src={`/images/${selectedImage}`} alt="main" />}
          </div>
        </div>

        {/* Info */}
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
            {(productData.details || []).map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="buttons">
            <div className="btn-row">
              <button className="btn-cart" onClick={() => onAddToCart(productData)}>Add to Cart</button>
              <button
                className={`btn-wishlist ${isLiked ? 'liked' : ''}`}
                onClick={() => onLike(productData)}
              >
                {isLiked ? '❤️' : '🤍'}
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

      {/* Features */}
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

      {/* Related */}
      <h3 className="title2">Related Products</h3>
      <div className="product-grid">
        {related.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
            onLike={onLike}
            likedProducts={likedProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
