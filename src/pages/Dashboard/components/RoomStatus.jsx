import { Typography } from "@mui/material";
import AppCard from "../../../components/common/Card/AppCard";

function RoomStatus() {

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
                    Room Availability
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

export default RoomStatus;