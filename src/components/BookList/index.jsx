import { useEffect, useState } from "react";
import BookItem from "../BookItem";
import PriceRange from "../PriceRange";
import Header from "../Header";
import "./index.css";
import Loader from "../Loader";

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

  // ✅ ADDED: pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch("https://gutendex.com/books");
      const data = await response.json();

      const books = data.results.map(book => ({
        id: book.id,
        title: book.title,
        subtitle: book.subjects?.[0] || "No subtitle",
        image: book.formats["image/jpeg"],
        authors: book.authors.map(a => a.name).join(", "),
        price: Math.floor(Math.random() * 500) + 100,
      }));

      setBooksData(books);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

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

  // ✅ ADDED: pagination logic
  const filteredBooks = getFilteredBooks();

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderLoadingView = () => (
    <>
      <Header/>
      <Loader/>
    </>
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

        <div className="search-box-container">
          <input
            type="search"
            placeholder="Search books..."
            className="search-input"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />
        </div>

        <PriceRange
          sliderExtremes={priceRangeExtreme}
          sliderPositions={priceRangeValue}
          onChangeSliderPosition={(value) => {
            setPriceRangeValue(value);
            setCurrentPage(1); // reset page on filter
          }}
        />

        {/* ✅ ADDED: empty state */}
        {filteredBooks.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>
            No books available in this range
          </h2>
        ) : (
          <>
            <ul className="book-list-container">
              {currentBooks.map(book => (
                <BookItem key={book.id} bookItemDetails={book} />
              ))}
            </ul>

            {/* ✅ ADDED: pagination UI */}
            <div className="pagination-container">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => changePage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
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