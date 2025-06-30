import React from "react";
import ProductCard from "./ProductCard";
import './like.css';

const Like = ({ likedProducts, onLike }) => {
  return (
    <div className="like-page">
      <h2 className="like-heading">Your Wishlist ❤️</h2>

      {likedProducts.length > 0 ? (
        <div className="like-grid">
          {likedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={onLike}
              likedProducts={likedProducts}
            />
          ))}
        </div>
      ) : (
        <div className="like-empty">
          <img src="/images/empty-wishlist.svg" alt="Empty Wishlist" />
          <p>No favourites yet</p>
          <a href="/" className="explore-btn">Browse Products</a>
        </div>
      )}
    </div>
  );
};

export default Like;
