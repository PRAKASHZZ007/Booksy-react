import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetCart } from "../redux/cartSlice";
import UserDetailsForm from "../UserDetailsForm";

import "./index.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.cartList);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // ✅ FIXED: price is already number
  const getTotal = list =>
    list.reduce((sum, item) => {
      const price = item.price;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);

  const total = getTotal(cartList);

  const handleOrderSubmit = details => {
    setOrderItems(cartList);   // snapshot
    setOrderTotal(total);
    setUserDetails(details);
    setOrderPlaced(true);
    dispatch(resetCart());
  };

  // ✅ ORDER SUMMARY (before checkout)
  const renderOrderSummary = () => (
    <div className="summary-container">
      {cartList.map(item => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;

        return (
          <div key={item.id} className="summary-item-container">
            <img
              src={item.image || "https://via.placeholder.com/100"}
              alt={item.title}
              className="summary-item-image"
            />
            <p className="summary-item-title">{item.title}</p>
            <p className="summary-item-qty">Qty: {quantity}</p>
            <p className="summary-item-price">
              ₹ {itemTotal.toFixed(2)}
            </p>
          </div>
        );
      })}

      <div className="summary-item-container total-row">
        <p className="summary-total-title">Total</p>
        <p className="summary-total-price">₹ {total.toFixed(2)}</p>
      </div>
    </div>
  );

  // ✅ AFTER ORDER PLACED
  const renderOrderConfirmation = () => (
    <div className="order-confirmation">
      <h1>Thank you for your order!</h1>

      <div className="order-details-container">
        <div className="user-details">
          <h2>Delivery Information</h2>
          <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Country:</strong> {userDetails.country}</p>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {orderItems.map(item => {
            const quantity = item.quantity || 1;
            const itemTotal = item.price * quantity;

            return (
              <div key={item.id} className="order-item">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.title}
                  className="order-item-image"
                />
                <div>
                  <p className="order-item-title">{item.title}</p>
                  <p>Qty: {quantity}</p>
                  <p className="order-item-price">
                    ₹ {itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="order-total">
            <p><strong>Total:</strong> ₹ {orderTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <Link to="/">
        <button className="home-button">Back to Home</button>
      </Link>
    </div>
  );

  if (orderPlaced) {
    return renderOrderConfirmation();
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-banner">
        <div className="checkout-banner-content-container">
          <div className="logo-container">
            <Link to="/" className="nav-link">
              <div className="logo">B</div>
              BOOKSY
            </Link>
          </div>
        </div>
      </div>

      <div className="checkout-form">
        <div className="checkout-content-container">
          <h1 className="checkout-heading">Checkout</h1>

          <Link to="/cart" className="back-button">
            <FaArrowLeft />
          </Link>

          <div className="form-and-summary">
            <UserDetailsForm onSubmit={handleOrderSubmit} />
            {renderOrderSummary()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;