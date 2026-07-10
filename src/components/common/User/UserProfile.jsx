import {
    Avatar,
    Box,
    Typography
} from "@mui/material";

import { useAuth } from "../../../context/AuthContext";

function UserProfile() {
    
    const { user } = useAuth();

    return (

        <Box
            sx={{
                display: "flex",
                alignitems: "center",
                gap: 2
            }}
        >

            <Avatar
                sx={{
                    bgcolor:"white",
                    color:"primary.main",
                    fontWeight:700
                }}
            >
                F
            </Avatar>

            <Box>

                <Typography
                    fontWeight={600}
                >
                    {user?.EMP_NAME}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color:"rgba(255,255,255,.75)"
                    }}
                >
                    {user?.DEPT_NM}
                </Typography>

            </Box>

        </Box>

    );

}

export default UserProfile;