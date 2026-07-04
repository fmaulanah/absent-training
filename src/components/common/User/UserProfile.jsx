import {
    Avatar,
    Box,
    Typography
} from "@mui/material";

function UserProfile() {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
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
                    Fikri
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color:"rgba(255,255,255,.75)"
                    }}
                >
                    IT Programmer
                </Typography>

            </Box>

        </Box>

    );

}

export default UserProfile;