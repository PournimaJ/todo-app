import { useState } from "react";   
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function  Register() {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleRegister = async () => {
             try {
                const res = await axios.post("http://localhost:5000/register", {username, password });
                if (res.data.success){
                    alert("Registered Successfully!");
                    navigate("/");
                }
                else{
                    alert(res.data.message || "Registration failed ");
                }
             }catch{
                alert("Error during registration");
             }
        };

        return (
            <div className="auth-page">
                <h2>Register</h2>
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" onChange= {(e) => setPassword(e.target.value)} />
                <button onClick ={handleRegister}> Register</button>

            <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
        );
}