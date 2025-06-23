import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, onClearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate order submission
    alert('Order Placed Successfully!');
    onClearCart(); // Clear cart after successful order
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.discountedPrice, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input name="address" type="text" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

        <div className="checkout-summary">
          <h4>Total Items: {cart.length}</h4>
          <h4>Total Price: ₹{totalPrice}</h4>
        </div>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
