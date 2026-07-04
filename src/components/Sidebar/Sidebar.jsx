import {

    Box,

    Divider,

    List

} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import { MENUS } from "../../constants/menu";

import SidebarHeader from "./SidebarHeader";

import SidebarItem from "./SidebarItem";

import SidebarFooter from "./SidebarFooter";

function Sidebar(){

    const navigate = useNavigate();

    const location = useLocation();

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

                        onClick={()=>navigate(menu.path)}

                    />

                ))}

            </List>

            <SidebarFooter/>

        </Box>

    );

}

export default Sidebar;