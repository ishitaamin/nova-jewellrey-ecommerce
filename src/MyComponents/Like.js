import React from "react";
import ProductCard from "./ProductCard";
import './like.css';

const Like = ({ likedProducts, onLike }) => {
  return (
    <div className="like-page">
      <h2 className="like-heading">Your Wishlist ❤️</h2>
      {likedProducts.length > 0 ? (
        <div className="product-grid">
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
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          You haven't liked any products yet.
        </p>
      )}
    </div>
  );
};

export default Like;
