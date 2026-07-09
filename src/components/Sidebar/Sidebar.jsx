import { Box, Divider, List } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { MENUS } from "../../constants/menu";

import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

function Sidebar({ isMobile, onClose }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (path) => {

        navigate(path);

        if (isMobile) {

            onClose();

        }

    };

    return(

        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                height:"100%"
            }}
        >

            <SidebarHeader/>

            <Divider/>

            <List>

                {MENUS.map((menu)=>(

                    <SidebarItem

                        key={menu.id}

                        title={menu.title}

                        icon={menu.icon}

                        selected={location.pathname===menu.path}

                        onClick={() => handleMenuClick(menu.path)}

                    />

                ))}

            </List>

            <SidebarFooter/>

        </Box>

    );

}

export default Sidebar;