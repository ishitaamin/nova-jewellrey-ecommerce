// MyComponents/Cart.js
import React from "react";
import "./Cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems = [], onRemoveFromCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.discountedPrice, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <img
            src="/images/empty-cart.png"
            alt="Empty cart"
            className="empty-cart-img"
          />
          <p className="empty-msg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={`/images/${item.image}`}
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
            <button
              className="checkout-btn"
              onClick={() => {
                localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
                localStorage.setItem('checkoutMode', 'cart');
                navigate('/checkout');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
