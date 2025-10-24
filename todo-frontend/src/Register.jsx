import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/register`, { username, password });
      if (res.data.success) {
        alert("Registered successfully!");
        navigate("/");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      alert("Registration Error");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}