import { Typography, Box } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppCard from "../../../components/common/Card/AppCard";
import useResponsive from "../../../hooks/useResponsive";

function DashboardStat({
    title,
    value,
    icon,
    color = "primary.main"
}) {

    const { isMobile } = useResponsive();

    return (

        <AppCard
            elevation={2}
            sx={{
                borderRadius: 3,
                height: "100%",
                "& .MuiCardContent-root": {
                    p: {
                        xs: 2,
                        md: 3
                    }
                }
            }}
        >


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: {
                        xs: 1,
                        md: 2
                    }
                }}
            >

                <Typography
                    variant={isMobile ? "caption" : "body2"}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        color: color
                    }}
                >
                    {
                        <CalendarMonthIcon
                            sx={{
                                fontSize: {
                                    xs: 28,
                                    md: 36
                                }
                            }}
                        />
                    }
                </Box>

            </Box>

            <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight={700}
            >
                {value}
            </Typography>


        </AppCard>

    );

}

export default DashboardStat;