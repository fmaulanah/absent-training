import Grid from "@mui/material/Grid";

import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

import PageHeader from "../../components/common/PageHeader/PageHeader";

import DashboardStat from "./components/DashboardStat";
import TodaySchedule from "./components/TodaySchedule";
import RoomStatus from "./components/RoomStatus";
import UpcomingTraining from "./components/UpcomingTraining";

function Dashboard() {

    return (

        <>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome back!"
            />

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 3 }}>

                    <DashboardStat
                        title="Today's Training"
                        value={12}
                        icon={<SchoolIcon fontSize="large" />}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <DashboardStat
                        title="Available Room"
                        value={8}
                        icon={<MeetingRoomIcon fontSize="large" />}
                        color="success.main"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <DashboardStat
                        title="Active Trainer"
                        value={5}
                        icon={<PersonIcon fontSize="large" />}
                        color="warning.main"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <DashboardStat
                        title="Today's Participants"
                        value={126}
                        icon={<GroupsIcon fontSize="large" />}
                        color="info.main"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>

                    <TodaySchedule />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <RoomStatus />

                </Grid>

                <Grid size={12}>

                    <UpcomingTraining />

                </Grid>

            </Grid>

        </>

    );

}

export default Dashboard;