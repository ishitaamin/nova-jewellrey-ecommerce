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
          <p>You haven't liked any products yet.</p>
        </div>
      )}
    </div>
  );
};

export default Like;
