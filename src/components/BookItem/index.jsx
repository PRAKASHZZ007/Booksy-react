import { Link } from "react-router-dom";
import "./index.css";

const BookItem = ({ bookItemDetails }) => {
  const { title, subtitle, image, price, id } = bookItemDetails;

  return (
    <li className="book-item-container">
      <Link to={`/books/${id}`} className="book-item-nav-link">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className="book-image"
        />
        <h1 className="book-title">{title}</h1>
        <p className="book-subtitle">{subtitle}</p>
        <p className="book-price">₹ {price}</p>
      </Link>
    </li>
  );
};

export default BookItem;