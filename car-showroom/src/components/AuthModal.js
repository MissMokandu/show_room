import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let response;
      if (activeTab === "signup") {
        if (role === "admin") {
          response = await fetch("https://show-room-aype.onrender.com/admin/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, showroom_id: 1 }),
          });
        } else {
          response = await fetch("https://show-room-aype.onrender.com/buyer/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email }),
          });
        }
      } else {
        if (role === "admin") {
          response = await fetch("https://show-room-aype.onrender.com/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
        } else {
          response = await fetch("https://show-room-aype.onrender.com/buyer/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
        }
      }

      const data = await response.json();
      if (!response.ok) {
        setError(
          data.error || `${activeTab === "signup" ? "Signup" : "Login"} failed`
        );
        return;
      }

      login({ username, role });
      // Modal will close automatically as user is now logged in
    } catch (err) {
      setError(`${activeTab === "signup" ? "Signup" : "Login"} failed`);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("buyer");
    setError(null);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => switchTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => switchTab("signup")}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {activeTab === "signup" && role === "buyer" && (
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          )}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {activeTab === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
