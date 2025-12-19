import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Confirm.css";

const Confirm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle confirm order
  const handleConfirmOrder = async () => {
    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.cardNumber
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Validate card number (simple check)
    if (formData.cardNumber.length < 13 || formData.cardNumber.length > 19) {
      alert("Please enter a valid card number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Prepare order data
      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        books: cartItems.map(item => ({
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: item.quantity,
          coverImage: item.coverImage
        })),
        totalAmount: totalPrice
      };

      // Save order to database
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setMessage("Order confirmed successfully!");
        alert(`Order confirmed! Order total: Rs ${totalPrice.toFixed(2)}`);

        // Clear cart and redirect
        localStorage.removeItem("cartItems");
        setCartItems([]);
        navigate("/");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to confirm order");
        alert("Failed to confirm order: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error confirming order");
      alert("Error confirming order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="confirm-container">
        <div className="empty-cart">
          <p>No items in cart. Please add books first.</p>
          <button className="btn-back" onClick={() => navigate("/cart")}>
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-container">
      <h1>Order Confirmation</h1>
      {message && <p className="message">{message}</p>}

      <div className="confirm-grid">
        {/* Order Items */}
        <div className="order-items-section">
          <h2>Order Items</h2>
          <div className="order-items">
            {cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.coverImage} alt={item.title} className="order-book-img" />
                <div className="order-item-details">
                  <p className="order-title">{item.title}</p>
                  <p className="order-author">{item.author}</p>
                  <p className="order-price">
                    Rs {item.price} x {item.quantity} = Rs{" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total Amount: Rs {totalPrice.toFixed(2)}</h3>
          </div>
        </div>

        {/* Shipping & Payment Form */}
        <div className="form-section">
          <h2>Shipping & Payment Details</h2>
          <form className="confirm-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </div>

              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter your zip code"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="Enter your card number"
                maxLength="19"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-confirm"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
              <button
                type="button"
                className="btn-back"
                onClick={() => navigate("/cart")}
                disabled={loading}
              >
                Back to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
