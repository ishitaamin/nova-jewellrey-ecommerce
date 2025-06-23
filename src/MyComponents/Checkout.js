import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = ({ cart = [], onClearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isBuyNow, setIsBuyNow] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem('checkoutMode');
    const singleItem = JSON.parse(localStorage.getItem('checkoutItem'));

    if (mode === 'buyNow' && singleItem) {
      setCheckoutItems([singleItem]);
      setIsBuyNow(true);
    } else {
      setCheckoutItems(cart);
    }
  }, [cart]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Construct order object
    const order = {
      items: checkoutItems,
      user: formData,
      total: totalPrice,
      date: new Date().toLocaleString(),
      mode: isBuyNow ? "Buy Now" : "Cart",
    };
  
    // You can store this order locally or send it to backend (Firebase, etc.)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // Clear localStorage
    if (isBuyNow) {
      localStorage.removeItem('checkoutItem');
      localStorage.removeItem('checkoutMode');
    } else {
      localStorage.removeItem('checkoutItems');
      localStorage.removeItem('checkoutMode');
      onClearCart?.();
    }
  
    // Reset form & UI
    setFormData({
      name: '',
      address: '',
      email: '',
      phone: '',
    });
  
    setCheckoutItems([]);
  
    // Show confirmation
    alert('🎉 Order Placed Successfully!');
  
    // Optional redirect
    window.location.href = '/';
  };
  

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.discountedPrice, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {checkoutItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input name="address" type="text" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

            <div className="checkout-summary">
              <h4>Total Items: {checkoutItems.length}</h4>
              <h4>Total Price: ₹{totalPrice}</h4>
            </div>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>

          <div className="checkout-items-preview">
            {checkoutItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={require(`./images/${item.image}`)} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.discountedPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
