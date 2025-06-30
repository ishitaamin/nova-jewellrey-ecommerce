import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = ({ cart = [], onClearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.discountedPrice, 0);

  useEffect(() => {
    const mode = localStorage.getItem('checkoutMode');
    const singleItem = JSON.parse(localStorage.getItem('checkoutItem'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (mode === 'buyNow' && singleItem) {
      setCheckoutItems([singleItem]);
      setIsBuyNow(true);
    } else {
      setCheckoutItems(cart);
    }

    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/users/addresses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setSavedAddresses(data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, [cart]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingInfo = selectedAddress
      ? { name: selectedAddress.name, address: selectedAddress.address, phone: selectedAddress.phone }
      : formData;

    const user = JSON.parse(localStorage.getItem("user")); // Must be set at login
    const order = {
      items: checkoutItems,
      user: { ...shippingInfo, email: user?.email || "user@example.com" },
      total: totalPrice,
      date: new Date().toLocaleString(),
      mode: isBuyNow ? "Buy Now" : "Cart",
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) throw new Error("Failed to place order");

      if (!selectedAddress) {
        await fetch("http://localhost:4000/api/users/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ...formData, pincode: "000000" })
        });
      }

      localStorage.removeItem('checkoutItem');
      localStorage.removeItem('checkoutItems');
      localStorage.removeItem('checkoutMode');
      onClearCart?.();

      setFormData({ name: '', address: '', phone: '' });
      setCheckoutItems([]);

      setSuccessMsg("🎉 Order placed successfully! Redirecting to homepage...");
      setTimeout(() => (window.location.href = '/'), 2500);
    } catch (err) {
      console.error("Order error:", err);
      setSuccessMsg("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h2>🧾 Checkout</h2>

      {successMsg && <div className="success-banner">{successMsg}</div>}

      {checkoutItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <div className="checkout-wrapper">
          <div className="form-section">
            <h3>Shipping Information</h3>

            {savedAddresses.length > 0 && (
              <div className="address-selection">
                <h4>Select a saved address:</h4>
                <ul>
                  {savedAddresses.map((addr) => (
                    <li key={addr._id}>
                      <label>
                        <input
                          type="radio"
                          name="selectedAddress"
                          onChange={() => setSelectedAddress(addr)}
                        />
                        {addr.name} — {addr.address}, {addr.pincode}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form className="checkout-form" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={!!selectedAddress}
              />

              <input
                name="address"
                type="text"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={!!selectedAddress}
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={!!selectedAddress}
              />

              <div className="checkout-summary">
                <h4>Total Items: {checkoutItems.length}</h4>
                <h4>Total Price: ₹{totalPrice}</h4>
              </div>

              <button type="submit" className="place-order-btn">🛍️ Place Order</button>
            </form>
          </div>

          <div className="preview-section">
            <h3>🧺 Items Preview</h3>
            {checkoutItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={`/images/${item.image}`} alt={item.name} />
                <div>
                  <p><strong>{item.name}</strong></p>
                  <p>₹{item.discountedPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
