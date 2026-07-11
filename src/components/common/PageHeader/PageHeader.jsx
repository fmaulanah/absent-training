import {
    Box,
    Typography
} from "@mui/material";

function PageHeader({

    title,
    subtitle,
    action

}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                    xs: "flex-start",
                    sm: "center"
                },
                flexDirection: {
                    xs: "column",
                    sm: "row"
                },
                gap: 2,
                mb: 4
            }}
        >

            <Box>

                <Typography
                    variant="h4"
                    sx={{
                        typography: {
                            xs: "h5",
                            sm: "h4"
                        },
                        fontWeight: 700
                    }}
                >

                    {title}

                </Typography>

                {subtitle && (

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                            fontSize: {
                                xs: "0.875rem",
                                sm: "1rem"
                            }
                        }}
                    >

                        {subtitle}

                    </Typography>

                )}

            </Box>

            {action && (

                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "auto"
                        }
                    }}
                >

                    {action}

                </Box>

            )}

        </Box>

    );

}

export default PageHeader;