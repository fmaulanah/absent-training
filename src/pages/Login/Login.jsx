import { Box, Container, Paper } from "@mui/material";
import LoginForm from "./LoginForm";

function Login() {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#0F005F 0%,#24126A 100%)"
            }}
        >

            <Container maxWidth="sm">

                <Paper
                    elevation={8}
                    sx={{
                        p: 5,
                        borderRadius: 4
                    }}
                >

                    <LoginForm />

                </Paper>

            </Container>

        </Box>

    );

}

export default Login;