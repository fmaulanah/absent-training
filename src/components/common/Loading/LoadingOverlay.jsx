import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

function LoadingOverlay({
    open,
    text = "Loading..."
}) {

    return (

        <Backdrop
            open={open}
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 10,
                bgcolor: "rgba(0,0,0,.45)"
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    px: 5,
                    py: 4,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    minWidth: 260,
                    boxShadow: 10
                }}
            >

                <CircularProgress size={42} />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >

                    {text}

                </Typography>

            </Box>

        </Backdrop>

    );

}

export default LoadingOverlay;