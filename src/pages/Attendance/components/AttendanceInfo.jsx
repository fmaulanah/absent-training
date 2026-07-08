import dayjs from "dayjs";

import {
    Chip,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import AppCard from "../../../components/common/Card/AppCard";

function AttendanceInfo({ training }) {

    if (!training) {

        return (

            <AppCard
                title="Informasi Training"
                sx={{ mt: 3 }}
            >

                <Typography
                    color="text.secondary"
                    align="center"
                >

                    Silakan pilih training terlebih dahulu.

                </Typography>

            </AppCard>

        );

    }

    return (

        <AppCard
            title="Informasi Training"
            sx={{ mt: 3 }}
        >

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 6 }}>

                    <Stack spacing={2}>

                        <BoxItem
                            icon={<SchoolIcon color="primary" />}
                            title="Training"
                            value={training.title}
                        />

                        <BoxItem
                            icon={<PersonIcon color="primary" />}
                            title="Trainer"
                            value={training.trainerName}
                        />

                    </Stack>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Stack spacing={2}>

                        <BoxItem
                            icon={<MeetingRoomIcon color="primary" />}
                            title="Ruangan"
                            value={training.roomName}
                        />

                        <BoxItem
                            icon={<CalendarMonthIcon color="primary" />}
                            title="Tanggal"
                            value={dayjs(training.startDate).format("DD MMMM YYYY")}
                        />

                    </Stack>

                </Grid>

            </Grid>

        </AppCard>

    );

}

function BoxItem({ icon, title, value }) {

    return (

        <Stack
            direction="row"
            spacing={2}
            alignitems="center"
        >

            {icon}

            <Stack spacing={0.2}>

                <Typography
                    variant="header"
                    color="text.secondary"
                >

                    {title}

                </Typography>

                <Typography fontWeight={600}>

                    {value}

                </Typography>

            </Stack>

        </Stack>

    );

}

export default AttendanceInfo;