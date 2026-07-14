import {

    Box,
    CircularProgress,
    Typography

} from "@mui/material";

function PageLoader({

    message = "Loading..."

}) {

    return (

        <Box
            sx={{

                height: "60vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                flexDirection: "column",

                gap: 2

            }}
        >

            <CircularProgress />

            <Typography
                color="text.secondary"
            >

                {message}

            </Typography>

        </Box>

    );

}

export default PageLoader;