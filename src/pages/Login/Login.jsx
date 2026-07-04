import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
    console.log("Login Click");

    console.log("User :", userId);
    console.log("Password :", password);

    navigate("/home");
    }

    return (
        <div>

            <h2>Login</h2>

            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            <p>User ID : {userId}</p>

            <p>Password : {password}</p>

        </div>
    );
}

export default Login;