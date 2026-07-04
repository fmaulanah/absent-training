import { Typography } from "@mui/material";
import AppCard from "../../../components/common/Card/AppCard";

function UpcomingTraining() {

    return (

        <AppCard
            sx={{
                borderRadius: 3,
                height: 300
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    Upcoming Training
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

export default UpcomingTraining;