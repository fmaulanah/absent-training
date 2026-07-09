import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarFooter(){
    
    const version = import.meta.env.VITE_APP_VERSION;

    const navigate = useNavigate();

    const { user } = useAuth();
    const { logout } = useAuth();

    const handleLogout = () => {

        if (!window.confirm("Logout dari aplikasi?")) {

            return;

        }

        logout();

        navigate("/login", {
            replace: true
        });

    };
    
    return(

        <Box
            sx={{
            mt: "auto",
            // p: 2,
            borderTop: 1,
            borderColor: "divider",
            textAlign:"center"
        }}
        >

            <List>

                <ListItemButton
                    sx={{

                        mx:1,
                        my:.5,
                        borderRadius:2,
                        "&:hover":{

                            bgcolor:"primary.light",

                            color:"white",

                            "& .MuiListItemIcon-root":{

                                color:"white"

                            }

                        }

                    }}
                    onClick={handleLogout}
                >

                    <ListItemIcon>

                        <LogoutIcon/>

                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                    />

                </ListItemButton >

            </List>

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    mt: "auto",
                    py: 2,
                    textAlign:"center",
                    opacity:"30%"
                }}
            >

                v{import.meta.env.VITE_APP_VERSION} (Build {import.meta.env.VITE_APP_BUILD})

            </Typography>

        </Box>

    );

}

export default SidebarFooter;