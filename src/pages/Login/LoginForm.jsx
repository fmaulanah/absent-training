import {
    Box,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import authService from "../../services/authService";
import employeeService from "../../services/employeeService";

import AppButton from "../../components/common/Button/AppButton";
import Logo from "../../assets/logo/logo.png";

import useSnackbar from "../../hooks/useSnackbar";
import useResponsive from "../../hooks/useResponsive";

function LoginForm() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();
    const { isMobile} = useResponsive();

    const handleLogin = async () => {

        if (!userId || !password) {

            showSnackbar(

                    "User ID dan Password harus diisi.",

                    "warning"

                );

            return;

        }

        try {

            setLoading(true);

            const user = await authService.login(userId, password);

            if (user == null) {

                //alert("User ID atau Password salah.");
                
                showSnackbar(

                    "User ID atau Password salah.",

                    "warning"

                );

                return;

            }

            delete user.PASSWORD;

            login(user);

            await employeeService.refreshEmployees();
            
            navigate("/dashboard");

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    mb: 4,
                }}
            >
                <Box
                    component="img"
                    src={Logo}
                    alt="CSG Logo"
                    sx={{

                        width: 60,
                        height: "auto",
                        display: "block",
                    }}
                />

                <Box>
                    <Typography
                        variant= {isMobile? "h5" : "h4"}
                        sx={{
                            fontWeight: 700,
                            mb: 0.5,
                        }}
                    >
                        Login
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        HRD Training Scheduler
                    </Typography>
                </Box>
            </Box>

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

            <Typography
                variant="body1"
                sx={{
                    color: "text.secondary",
                    textAlign:"center",
                    mt: 3
                }}
            >
                v{import.meta.env.VITE_APP_VERSION} (Build {import.meta.env.VITE_APP_BUILD})

            </Typography>

        </Box>

    );

}

export default LoginForm;
