import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@book.com" && password === "admin") {
      localStorage.setItem("uss erRole", "admin");
      navigate("/Home");
    } else {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userName", email);
      navigate("/Home");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          backgroundColor: "#e0e0e0",
          padding: "50px",
          maxWidth: "400px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#2196F3" }}>
            Sign Up
          </a>
        </p>
        <p style={{ fontSize: "12px", color: "gray" }}>
          Admin: admin@book.com / admin
        </p>
      </div>
    </div>
  );
};

export default Login;