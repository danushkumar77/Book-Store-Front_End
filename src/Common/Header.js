import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/29/29302.png" 
        alt="Bookstore Logo" 
        className="logo"
      />

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Viewbook">Viewbook</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/Requestbook">Requestbook</NavLink>
        <NavLink to="/About">About</NavLink>

       
        {!isLoggedIn ? (
          <NavLink to="/Login">Login</NavLink>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
