import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from "../redux/cartSlice";
import "./index.css";

const CartItem = ({ cartItemDetails }) => {
  const dispatch = useDispatch();

  const { title, subtitle, image, price, quantity = 1 } = cartItemDetails;

  return (
    <div className="cart-item-container">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={title}
        className="book-image"
      />

      <div className="product-info-container">
        <h1 className="book-title">{title}</h1>
        <p className="book-subtitle">{subtitle}</p>
        <h1 className="book-price">₹ {price}</h1>
      </div>

      <div className="product-actions-container">
        <button
          className="quantity-btn"
          onClick={() => dispatch(decreaseQuantity(cartItemDetails))}
        >
          -
        </button>

        <p className="quantity-text">{quantity}</p>

        <button
          className="quantity-btn"
          onClick={() => dispatch(increaseQuantity(cartItemDetails))}
        >
          +
        </button>

        <button
          className="delete-button"
          onClick={() => dispatch(deleteFromCart(cartItemDetails))}
        >
          <FaTrash />
        </button>
      </div>

      <div className="amount-container">
        <h1 className="book-price">₹ {price * quantity}</h1>
      </div>
    </div>
  );
};

export default CartItem;