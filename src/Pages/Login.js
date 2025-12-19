import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/login.css";

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [isRegistering, setIsRegistering] = useState(false);
  let [regUsername, setRegUsername] = useState("");
  let [regEmail, setRegEmail] = useState("");
  let [regPassword, setRegPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");
      
      console.log("Logging in with:", { username, password });
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      console.log("Login response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userName", result.user.username);
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("token", result.token);
        navigate("/");
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
        setErrorMessage(error.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage("");
      
      console.log("Registering with:", { username: regUsername, email: regEmail, password: regPassword });
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword })
      });

      console.log("Register response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        alert("Registration successful! Please login with your credentials.");
        setIsRegistering(false);
        setRegUsername("");
        setRegEmail("");
        setRegPassword("");
      } else {
        const error = await response.json();
        console.error("Registration failed:", error);
        setErrorMessage(error.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={isRegistering ? handleRegister : handleLogin}>
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        <br></br>
        
        {errorMessage && <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{errorMessage}</p>}

        {isRegistering ? (
          <>
            <label>Username</label>
            <input
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              required
            />

            <label>Email</label>
            <input
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />

            <label>Password</label>
            <input
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </>
        ) : (
          <>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              required
            />

            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </>
        )}

        <button className="loginButton" type="submit" disabled={loading}>
          {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setUsername("");
              setPassword("");
              setRegUsername("");
              setRegEmail("");
              setRegPassword("");
              setErrorMessage("");
            }}
            style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline", fontSize: "14px" }}
          >
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
