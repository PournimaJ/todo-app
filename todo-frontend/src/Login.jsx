import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent default form submit
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.success) {
        localStorage.setItem("userId", res.data.userId);
        navigate("/todoList");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      alert("Login Error");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/register">Sign Up</a></p>
    </div>
  );
}