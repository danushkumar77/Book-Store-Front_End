import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Update quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle proceed to confirm
  const handleProceed = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Please add books first.");
      return;
    }
    navigate("/confirm");
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn-continue" onClick={() => navigate("/viewbook")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="book-info">
                      <img src={item.coverImage} alt={item.title} className="cart-book-img" />
                      <div>
                        <p className="book-title">{item.title}</p>
                        <p className="book-author">{item.author}</p>
                      </div>
                    </td>
                    <td className="price">Rs {item.price}</td>
                    <td className="quantity">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                    </td>
                    <td className="total">Rs {(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn-remove" onClick={() => removeFromCart(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <div className="summary-box">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-item total-item">
                <span>Total:</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn-proceed" onClick={handleProceed}>
                Proceed to Checkout
              </button>
              <button
                className="btn-continue-shopping"
                onClick={() => navigate("/viewbook")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
