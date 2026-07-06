import { Typography, Box } from "@mui/material";
import AppCard from "../../../components/common/Card/AppCard";

function DashboardStat({
    title,
    value,
    icon,
    color = "primary.main"
}) {

    return (

        <AppCard
            elevation={2}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        color: color
                    }}
                >
                    {icon}
                </Box>

            </Box>

            <Typography
                variant="h4"
                fontWeight={700}
            >
                {value}
            </Typography>


        </AppCard>

    );

}

export default DashboardStat;