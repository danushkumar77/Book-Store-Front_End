import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/Bookstore.json")
      .then((res) => res.json())
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
  }, []);

  // ===== SECTION LOGIC =====
  const bestSellers = books.slice(0, 5);
  const newArrivals = books.slice(5, 10);
  const awardWinners = books.slice(10, 15); // 👈 NEW

  const renderBooks = (list) =>
    list.map((book, index) => (
      <div className="book-card" key={index}>
        <div className="img-box">
          <img src={book.coverImage} alt={book.title} />
          <span className="discount">{book.discount || "20%"}</span>
        </div>

        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">{book.author}</p>

        <div className="rating">
          ⭐ {book.rating || "4.5"}
        </div>

        <p className="price">₹{book.price}</p>
      </div>
    ));

  return (
    <div className="home">

      {/* Best Sellers */}
      <section className="section">
        <div className="section-header">
          <h1>Best Sellers</h1>
        </div>
        <div className="book-row">
          {renderBooks(bestSellers)}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="section-header">
          <h1>New Arrivals</h1>
        </div>
        <div className="book-row">
          {renderBooks(newArrivals)}
        </div>
      </section>

      {/* ⭐ Award Winners */}
      <section className="section">
        <div className="section-header">
          <h1>Award Winners</h1>
        </div>
        <div className="book-row">
          {renderBooks(awardWinners)}
        </div>
      </section>

    </div>
  );
};

export default Home;
