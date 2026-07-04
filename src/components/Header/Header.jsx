import {
    Paper,
    Box,
    Typography
} from "@mui/material";

import Clock from "../common/Clock/Clock";
import UserProfile from "../common/User/UserProfile";

function Header() {

    return (

        <Paper
            elevation={0}
            sx={{

                px:4,

                py:3,

                bgcolor:"primary.main",

                color:"white",

                borderRadius:0

            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color="inherit"
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        sx={{
                            color:"rgba(255,255,255,.75)"
                        }}
                    >
                        Welcome back!
                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4
                    }}
                >

                    <Clock />

                    <UserProfile />

                </Box>

            </Box>

        </Paper>

    );

}

export default Header;