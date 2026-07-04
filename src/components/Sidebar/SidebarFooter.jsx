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

function SidebarFooter(){

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
                        primary="Fikri"
                    />

                </ListItemButton>

                <ListItemButton
                    sx={{
                        borderRadius:2,
                        mx:1,
                        color:"error.main"
                    }}
                >

                    <ListItemIcon>

                        <LogoutIcon/>

                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                    />

                </ListItemButton>

            </List>

        </Box>

    );

}

export default SidebarFooter;