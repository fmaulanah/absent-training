import {
    Paper,
    Box
} from "@mui/material";

import Clock from "../common/Clock/Clock";
import UserProfile from "../common/User/UserProfile";

function Header() {

    return (

        <Paper
            elevation={1}
            sx={{
                position: "fixed",

                top: 0,

                left: 260,

                right: 0,

                zIndex: (theme) => theme.zIndex.drawer - 1,

                px: 4,

                py: 3,

                bgcolor: "primary.main",

                color: "white",

                borderRadius: 0
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >

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
