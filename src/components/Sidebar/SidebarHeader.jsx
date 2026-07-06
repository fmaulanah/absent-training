import { Box, Typography } from "@mui/material";

import Logo from "../../assets/logo/logo.png";

function SidebarHeader() {

    return (

        <Box
            sx={{
                textAlign: "center",
                py: 4,
                px: 2
            }}
        >

            <Box
                component="img"
                src={Logo}
                alt="CSG Logo"
                sx={{
                    width: 80,
                    height: "auto",
                    mb: 2
                }}
            />

            <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
            >

                CSG

            </Typography>

            <Typography
                variant="body"
                color="text.secondary"
            >

                Training Scheduler

            </Typography>

        </Box>

    );

}

export default SidebarHeader;