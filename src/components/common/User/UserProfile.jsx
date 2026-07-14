import {
    Avatar,
    Box,
    Typography
} from "@mui/material";

import { useAuth } from "../../../context/AuthContext";

function UserProfile() {
    
    const getInitials = (name = "") => {

        const words = name.trim().split(/\s+/);

        if (words.length === 1) {

            return words[0].charAt(0).toUpperCase();

        }

        return (

            words[0].charAt(0) +
            words[1].charAt(0)

        ).toUpperCase();

    };

    const avatarColors = [
        "#3949AB",
        "#00897B",
        "#F57C00",
        "#8E24AA",
        "#039BE5",
        "#D81B60"
    ];

    const getAvatarColor = (name = "") => {

        const index = [...name].reduce(

            (sum, char) => sum + char.charCodeAt(0),

            0

        ) % avatarColors.length;

        return avatarColors[index];

    };

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
                    bgcolor: getAvatarColor(user?.EMP_NAME),
                    color: "#fff",
                    fontWeight:700
                }}
            >

                {getInitials(user?.EMP_NAME)}

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