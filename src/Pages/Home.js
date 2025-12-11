import React, { useEffect, useState } from "react";
import "./../Styles/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Bookstore.json")
      .then((res) => res.json())
      .then((data) => setBooks(data.books))  // Accessing "books" array
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      {books.map((book, index) => (
        <div key={index} className="card">
          <img src={book.coverImage} alt={book.title} className="book-img" />

          <p className="author">By {book.author}</p>

          <h3 className="title">{book.title}</h3>
          <p className="desc">{book.genre}</p>

          <p className="price">Rs {book.price}</p>

        </div>
      ))}
    </div>
  );
};

export default Home;
