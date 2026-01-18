import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Header";
import CartItem from "../CartItem";
import { resetCart } from "../redux/cartSlice";

import "./index.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector(state => state.cart.cartList);

  const isCartEmpty = cartList.length === 0;

  const total = cartList.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <>
      <Header />

      <div className="cart-page-container">
        <div className="cart-content-container">
          <h1 className="cart-heading">
            {isCartEmpty ? "Your cart is empty!" : "Your Cart"}
          </h1>

          <div className="cart-container">
            {cartList.map(item => (
              <CartItem key={item.isbn13} cartItemDetails={item} />
            ))}

            {isCartEmpty ? (
              <Link to="/books" className="continue-shopping-button-link">
                <button className="checkout-button remove-button">
                  Continue Shopping
                </button>
              </Link>
            ) : (
              <button
                className="checkout-button remove-button"
                onClick={() => dispatch(resetCart())}
              >
                Remove all
              </button>
            )}
          </div>
        </div>

        {!isCartEmpty && (
          <div className="order-content-container">
            <h1 className="order-title">Order Summary</h1>

            <div className="order-summary-container">
              <div className="order-amount-container">
                <p className="order-amount">Amount Payable:</p>
                <h1 className="cart-price">{`$${total.toFixed(2)}`}</h1>
              </div>

              <p className="order-text">(inclusive of all taxes)</p>

              <Link to="/checkout" className="continue-shopping-button-link">
                <button className="checkout-button">Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
