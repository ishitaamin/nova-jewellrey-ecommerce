
import React from "react";
import "./Cart.css";
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.discountedPrice, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={require(`./images/${item.image}`)}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.discountedPrice}</p>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal()}</h3>
            <Link to="/checkout">
  <button className="checkout-btn">Proceed to Checkout</button>
</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
