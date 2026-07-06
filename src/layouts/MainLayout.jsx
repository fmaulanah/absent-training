import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import {
    AppBar,
    Toolbar,
    Drawer,
    Box,
    Typography,
    CssBaseline
} from "@mui/material";

const drawerWidth = 260;

function MainLayout() {

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (

        <Box sx={{ display: "flex" }}>

            <CssBaseline />

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
            >

                <Box p={2}>

                    <Sidebar
                        isMobile={isMobile}
                        onClose={() => setDrawerOpen(false)}
                    />

                </Box>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        md: `calc(100% - ${drawerWidth}px)`
                    },
                    bgcolor: "#F5F7FA",
                    minHeight: "100vh"
                }}
            >
                <Header
                    isMobile={isMobile}
                    onMenuClick={() => setDrawerOpen(true)}
                />

                <Box
                    sx={{
                        mt: 12,
                        p:3
                    }}
                >

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;