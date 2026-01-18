import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { addToCart } from "../redux/cartSlice";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartList = useSelector(state => state.cart.cartList);

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [bookDetailsData, setBookDetailsData] = useState({});

  useEffect(() => {
    const getBookDetails = async () => {
      const bookUrl = `https://api.itbook.store/1.0/books/${id}`;

      try {
        const response = await fetch(bookUrl);
        if (response.ok) {
          const jsonResponse = await response.json();
          setBookDetailsData(jsonResponse);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    getBookDetails();
  }, [id]);

  const renderSuccessView = () => {
    const {
      title,
      image,
      subtitle,
      year,
      authors,
      price,
      desc,
      rating,
      publisher,
      isbn10,
      isbn13,
      pages,
    } = bookDetailsData;

    const isAddedToCart = cartList.find(
      eachCartItem => eachCartItem.isbn13 === isbn13
    );

    const onClickAddToCart = () => {
      dispatch(addToCart({ ...bookDetailsData, quantity: 1 }));
    };

    return (
      <div className="book-details-container">
        <div className="book-details-content-container">
          <div className="book-basic-details-container">
            <div className="book-details-image-container">
              <img
                src={image}
                alt={title}
                className="book-details-image"
              />
            </div>

            <div className="book-other-basic-details">
              <h1 className="book-details-heading book-details-title">
                {title}
              </h1>
              <p className="book-details-subtitle">{subtitle}</p>
              <p className="book-details-author">{authors}</p>
              <p className="book-details-release-year">
                Publication Year: {year}
              </p>

              <hr className="horizontal-rule display" />

              <p className="book-details-price">{price}</p>

              <div className="buttons-container">
                <button
                  className="book-details-button"
                  onClick={onClickAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </button>

              <button
                    className="book-details-button"
                    onClick={() => navigate("/books")}>
                      Back to Books</button>
              </div>
            </div>
          </div>

          <hr className="horizontal-rule" />

          <div>
            <h1 className="book-details-heading">Product Description</h1>
            <p>{desc}</p>
          </div>

          <hr className="horizontal-rule" />

          <div>
            <h1 className="book-details-heading">Product Details</h1>
            <table>
              <tbody>
                <tr><th>Title</th><td>{title}</td></tr>
                <tr><th>Subtitle</th><td>{subtitle}</td></tr>
                <tr><th>Authors</th><td>{authors}</td></tr>
                <tr><th>Publisher</th><td>{publisher}</td></tr>
                <tr><th>ISBN10</th><td>{isbn10}</td></tr>
                <tr><th>ISBN13</th><td>{isbn13}</td></tr>
                <tr><th>Pages</th><td>{pages}</td></tr>
                <tr><th>Year</th><td>{year}</td></tr>
                <tr><th>Rating</th><td>{rating}</td></tr>
                <tr><th>Price</th><td>{price}</td></tr>
              </tbody>
            </table>
          </div>

          <hr className="horizontal-rule" />
        </div>
      </div>
    );
  };

  const renderBookDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />;
      case apiStatusConstants.success:
        return renderSuccessView();
      default:
        return <ErrorMessage />;
    }
  };

  return (
    <>
      <Header />
      {renderBookDetails()}
    </>
  );
};

export default BookDetails;
