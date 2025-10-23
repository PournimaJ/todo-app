import { useState } from "react";   
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function  Login() {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleLogin = async (e) => {
            e.preventDefault();
             try {
                const res = await axios.post("http://localhost:5000/login", {username, password });
                if (res.data.success){
                    localStorage. setItem ("userId", res.data.userId);
                    navigate("/todoList");
                }
                else{
                    alert(res.data.message || "Login failed ");
                }
             }catch{
                alert("Login Error");
             }
        };

        return (
            <div className="auth-page">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          );
        }