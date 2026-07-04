import {

    Box,

    Divider,

    List,

    ListItemButton,

    ListItemIcon,

    ListItemText

} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarFooter(){
    
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
                mt:"auto"
            }}
        >

            <Divider/>

            <List>

                <ListItemButton
                    sx={{
                        borderRadius:2,
                        mx:1,
                        mb:1
                    }}
                >

                    <ListItemIcon>

                        <PersonIcon/>

                    </ListItemIcon>

                    <ListItemText
                        primary={user?.EMP_NAME}
                        secondary={user?.ROLE_ID}
                    />

                </ListItemButton>

                <ListItemButton
                    sx={{
                        borderRadius:2,
                        mx:1,
                        color:"error.main"
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

        </Box>

    );

}

export default SidebarFooter;