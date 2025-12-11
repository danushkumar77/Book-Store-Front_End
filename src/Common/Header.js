import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/29/29302.png" 
        alt="Bookstore Logo" 
        className="logo"
      />

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Addbook">Addbook</NavLink>
        <NavLink to="/Viewbook">Viewbook</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Login">Login</NavLink>
      </div>
    </header>
  );
};

export default Header;
