import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function SidebarItem({ title, icon: Icon, selected, onClick })
{

    return(

        <ListItemButton

            selected={selected}

            onClick={onClick}

            sx={{

                mx:1,

                my:.5,

                borderRadius:2,

                "&.Mui-selected":{

                    bgcolor:"primary.main",

                    color:"white",

                    "& .MuiListItemIcon-root":{

                        color:"white"

                    }

                },

                "&:hover":{

                    bgcolor:"primary.light",

                    color:"white",

                    "& .MuiListItemIcon-root":{

                        color:"white"

                    }

                }

            }}

        >

            <ListItemIcon

                sx={{

                    minWidth:40,

                    color:"inherit"

                }}

            >

                <Icon/>

            </ListItemIcon>

            <ListItemText

                primary={title}

            />

        </ListItemButton>

    );

}

export default SidebarItem;