import "./../Styles/About.css";

const About = () => {
  return (
    <div className="aboutContainer">

      {/* HERO SECTION */}
      <section className="aboutHero">
        <h1>About Our Bookstore</h1>
        <p>
          We are passionate about connecting readers with the perfect books, 
          inspiring imagination, and creating a community of book lovers.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="aboutSection">
        <h2>Who We Are</h2>
        <p>
          Founded with a love for reading, our bookstore provides a wide 
          variety of books across genres. We aim to make every visit a 
          delightful experience for readers of all ages.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="aboutSection lightBg">
        <h2>Our Mission</h2>
        <p>
          To promote reading culture by offering quality books, personalized 
          recommendations, and a welcoming space for all book enthusiasts.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="aboutSection">
        <h2>Why Choose Us</h2>

        <div className="featuresGrid">
          <div className="featureCard">
            <h3>📚 Wide Selection</h3>
            <p>Thousands of books across fiction, non-fiction, and more.</p>
          </div>

          <div className="featureCard">
            <h3>📝 Expert Recommendations</h3>
            <p>Our staff help you find the perfect book for every reader.</p>
          </div>

          <div className="featureCard">
            <h3>🏡 Cozy Reading Space</h3>
            <p>A comfortable and quiet environment for reading and browsing.</p>
          </div>

          <div className="featureCard">
            <h3>⚡ Fast Service</h3>
            <p>Quick checkout and easy online ordering for your convenience.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="aboutCTA">
        <h2>Visit Us Today</h2>
        <p>
          Explore our collection, discover new favorites, and join our community 
          of passionate readers.
        </p>
      </section>

      {/* CONTACT US SECTION */}
      <section className="aboutSection">
        <h2>Contact Us</h2>
        
        <div className="contactInfo">
          <div className="contactCard">
            <h3>📧 Email</h3>
            <p><a href="mailto:info@bookstore.com">info@bookstore.com</a></p>
          </div>

          <div className="contactCard">
            <h3>🌐 Website</h3>
            <p><strong>Bookstore Management System</strong></p>
            <p>Your Ultimate Destination for Book Lovers</p>
          </div>

          <div className="contactCard">
            <h3>📍 Address</h3>
            <p>123 Book Street</p>
            <p>Library City, State 12345</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
