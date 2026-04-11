import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { addToCart } from "../redux/cartSlice";

import "./index.css";

const apiStatusConstants = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartList = useSelector(state => state.cart.cartList);

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [bookDetailsData, setBookDetailsData] = useState({});

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();

        const formattedData = {
          id: data.id,
          title: data.title,
          subtitle: data.subjects?.[0] || "",
          authors: data.authors.map(a => a.name).join(", "),
          image: data.formats["image/jpeg"],
          desc: data.summaries?.[0] || "No description available",
          pages: data.download_count,
          publisher: "Gutenberg",
          year: "N/A",
          price: Math.floor(Math.random() * 500) + 100,
        };

        setBookDetailsData(formattedData);
        setApiStatus(apiStatusConstants.success);
      } catch {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    getBookDetails();
  }, [id]);

  const renderSuccessView = () => {
    const { title, image, subtitle, authors, price, desc, id } =
      bookDetailsData;

    const isAddedToCart = cartList.find(item => item.id === id);

    const onClickAddToCart = () => {
      dispatch(addToCart({ ...bookDetailsData, quantity: 1 }));
    };

    return (
      <div className="book-details-container">
        <div className="book-details-content-container">
          <div className="book-basic-details-container">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={title}
              className="book-details-image"
            />

            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <p>{authors}</p>
              <p className="book-details-price">₹ {price}</p>

                <button
                  className="primary-btn"
                  onClick={onClickAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => navigate("/books")}
                >
                  Back to Books
                </button>
            </div>
          </div>

          <h2>Description</h2>
          <p>{desc}</p>
        </div>
      </div>
    );
  };

  const renderView = () => {
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
      {renderView()}
    </>
  );
};

export default BookDetails;