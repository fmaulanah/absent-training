import { Box, Typography } from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

function EmptyState({

    title = "Tidak ada data",

    subtitle = "Belum ada data untuk ditampilkan.",

    icon = <InboxOutlinedIcon sx={{ fontSize: 64 }} />

}) {

    return (

        <Box
            sx={{
                py: 6,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >

            <Box
                sx={{
                    color: "text.disabled",
                    mb: 2
                }}
            >

                {icon}

            </Box>

            <Typography
                variant="h6"
                fontWeight={600}
            >

                {title}

            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mt: 1,
                    maxWidth: 360
                }}
            >

                {subtitle}

            </Typography>

        </Box>

    );

}

export default EmptyState;