/*import { useEffect, useState } from "react";
import BookItem from "../BookItem";
import PriceRange from "../PriceRange";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const priceRangeExtreme = [0, 1000];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const BookList = () => {
  const [booksData, setBooksData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [priceRangeValue, setPriceRangeValue] = useState(priceRangeExtreme);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch("https://api.itbook.store/1.0/new");
      const data = await response.json();

      const books = data.books.map(book => ({
        ...book,
        price: Math.floor(Math.random() * 1000), // fake price
      }));

      setBooksData(books);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onChangeSliderPosition = newRange => {
    setPriceRangeValue(newRange);
  };

  const filterBooksByPriceRange = () =>
    booksData.filter(
      book =>
        book.price >= priceRangeValue[0] &&
        book.price <= priceRangeValue[1]
    );

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <TailSpin color="#0284c7" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-container">
      <h1>Something went wrong. Please try again later.</h1>
    </div>
  );

  const renderSuccessView = () => {
    const filteredBooks = filterBooksByPriceRange();

    return (
      <>
        <Header />
        <h1 className="book-items-heading">Books</h1>

        <PriceRange
          sliderExtremes={priceRangeExtreme}
          sliderPositions={priceRangeValue}
          onChangeSliderPosition={onChangeSliderPosition}
        />

        <ul className="book-list-container">
          {filteredBooks.map(book => (
            <BookItem key={book.isbn13} bookItemDetails={book} />
          ))}
        </ul>
      </>
    );
  };

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.failure:
      return renderFailureView();
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    default:
      return null;
  }
};

export default BookList;
*/

import { useEffect, useState } from "react";
import BookItem from "../BookItem";
import PriceRange from "../PriceRange";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const priceRangeExtreme = [0, 1000];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const BookList = () => {
  const [booksData, setBooksData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [priceRangeValue, setPriceRangeValue] = useState(priceRangeExtreme);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch("https://api.itbook.store/1.0/new");
      const data = await response.json();

      const books = data.books.map(book => ({
        ...book,
        price: Math.floor(Math.random() * 1000),
      }));

      setBooksData(books);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onChangeSliderPosition = (newRange) => {
    setPriceRangeValue(newRange);
  };

  // 🔍 Price + Search logic
  const getFilteredBooks = () => {
    return booksData.filter(book => {
      const priceMatch =
        book.price >= priceRangeValue[0] &&
        book.price <= priceRangeValue[1];

      const searchMatch =
        searchInput === "" ||
        book.title.toLowerCase().includes(searchInput.toLowerCase());

      return priceMatch && searchMatch;
    });
  };

  const renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin color="#0284c7" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-container">
      <h1>Something went wrong</h1>
    </div>
  );

  const renderSuccessView = () => {
    const filteredBooks = getFilteredBooks();

    return (
      <>
        <Header />
        <h1 className="book-items-heading">Books</h1>

        {/* 🔍 Center Search Box */}
        <div className="search-box-container">
          <input
            type="search"
            placeholder="Search books..."
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <PriceRange
          sliderExtremes={priceRangeExtreme}
          sliderPositions={priceRangeValue}
          onChangeSliderPosition={onChangeSliderPosition}
        />

        <ul className="book-list-container">
          {filteredBooks.map(book => (
            <BookItem key={book.isbn13} bookItemDetails={book} />
          ))}
        </ul>
      </>
    );
  };

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.failure:
      return renderFailureView();
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    default:
      return null;
  }
};

export default BookList;

