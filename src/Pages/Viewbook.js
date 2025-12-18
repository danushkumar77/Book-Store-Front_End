import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Viewbook.css";

const Viewbook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/Bookstore.json")
      .then((res) => res.json())
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 Filter logic
  const filteredBooks = books.filter((book) =>
    (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.author || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.genre || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to cart function
  const addToCart = (book) => {
    const cartItems = localStorage.getItem("cartItems");
    let cart = cartItems ? JSON.parse(cartItems) : [];

    // Check if book already in cart
    const existingItem = cart.find((item) => item.title === book.title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...book,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${book.title} added to cart!`);
  };

  return (
    <>
      {/* 🔍 Search Bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title, author or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="home-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={index}
              className="card"
              onClick={() => setSelectedBook(book)}
              role="button"
            >
              <img src={book.coverImage} alt={book.title} className="book-img" />

              <p className="author">{book.author}</p>

              <h3 className="title">{book.title}</h3>
              <p className="desc">{book.genre}</p>

              <p className="published">Published: {book.publishedDate || book.published}</p>

              <p className="price">Rs {book.price}</p>
              <p className="rating">Rating: {book.rating}</p>

              <button className="btn-add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(book); }}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No books found</p>
        )}
      </div>

      {/* Modal detail view */}
      {selectedBook && (
        <div className="modal" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBook(null)}>
              ×
            </button>
            {selectedBook && (
              <div className="modal-grid">
                <img src={selectedBook.coverImage} alt={selectedBook.title} className="modal-img" />
                <div className="modal-details">
                  <h2>{selectedBook.title}</h2>
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Genre:</strong> {selectedBook.genre}</p>
                  <p><strong>Published:</strong> {selectedBook.publishedDate || selectedBook.published || 'N/A'}</p>
                  {selectedBook.stock !== undefined && <p><strong>Stock:</strong> {selectedBook.stock}</p>}
                  <p><strong>Price:</strong> Rs {selectedBook.price}</p>
                  <p><strong>Rating:</strong> {selectedBook.rating}</p>
                  {selectedBook.description && (
                    <>
                      <h4>Description</h4>
                      <p>{selectedBook.description}</p>
                    </>
                  )}
                  <button className="btn-modal-add-to-cart" onClick={() => { addToCart(selectedBook); setSelectedBook(null); }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Viewbook;
