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

                display:"flex",

                justifyContent:"space-between",

                alignitems:"center",

                mb:4

            }}
        >

            <Box>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >

                    {title}

                </Typography>

                {subtitle && (

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >

                        {subtitle}

                    </Typography>

                )}

            </Box>

            {action}

        </Box>

    );

}

export default PageHeader;