import {
    Box,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import authService from "../../services/authService";
import AppButton from "../../components/common/Button/AppButton";

function LoginForm() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();

    const handleLogin = async () => {

        if (!userId || !password) {

            alert("User ID dan Password harus diisi.");

            return;

        }

        try {

            setLoading(true);

            const user = await authService.login(userId, password);

            delete user.PASSWORD;

            if (!user) {

                alert("User ID atau Password salah.");

                return;

            }

            console.log(user);

            login(user);

            navigate("/dashboard");

        } catch (err) {

            console.error(err);

            alert("Terjadi kesalahan.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    textAlign: "center",
                    mb: 1
                }}
            >
                Login
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    mb: 4
                }}
            >
                CSG Training Scheduler
            </Typography>

            <TextField
                fullWidth
                label="User ID"
                margin="normal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <AppButton
                fullWidth
                onClick={handleLogin}
                disabled={loading}
                sx={{
                    mt: 3
                }}
            >

                {loading ? "Signing In..." : "Login"}

            </AppButton>

        </Box>

    );

}

export default LoginForm;