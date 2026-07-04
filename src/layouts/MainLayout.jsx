import { Outlet } from "react-router-dom";
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

    return (

        <Box sx={{ display: "flex" }}>

            <CssBaseline />

            <Drawer
                variant="permanent"
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

                    <Sidebar />

                </Box>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor:"#F5F7FA",
                    minHeight: "100vh"
                }}
            >
                <Header />

                <Box
                    sx={{
                        p: 3
                    }}
                >

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;