import { Typography } from "@mui/material";
import AppCard from "../../../components/common/Card/AppCard";

function TodaySchedule() {

    return (

        <AppCard
            sx={{
                borderRadius: 3,
                height: 320
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Today's Schedule
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={2}
                >
                    No data yet.
                </Typography>

            </CardContent>

        </AppCard>

    );

}

export default TodaySchedule;