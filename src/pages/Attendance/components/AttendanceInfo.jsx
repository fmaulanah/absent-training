import dayjs from "dayjs";

import { Chip, Grid, Stack, Typography } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";

import AppButton from "../../../components/common/Button/AppButton";
import AppCard from "../../../components/common/Card/AppCard";

import useResponsive from "../../../hooks/useResponsive";

function AttendanceInfo({

    training,
    scanInCount,
    scanOutCount,
    onScanIn,
    onScanOut

}) {

    const { isMobile } = useResponsive();

    if (!training) {

        return (

            <AppCard
                title="Informasi Training"
                sx={{ mt: 3 }}
                action={

                    <Stack
                        direction="row"
                        spacing={1}
                        flexwrap="wrap"
                    >

                        <AppButton
                            size="small"
                            startIcon={<PlayArrowIcon />}
                            disabled={!training}
                            onClick={onScanIn}
                        >

                            {isMobile ? "IN" : "Scan In"}

                        </AppButton>

                        <AppButton
                            size="small"
                            color="success"
                            startIcon={<PlayArrowIcon />}
                            disabled={!training}
                            onClick={onScanOut}
                        >

                            {isMobile ? "OUT" : "Scan Out"}

                        </AppButton>

                    </Stack>

                }
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
            action={

                <Stack
                    direction="row"
                    spacing={1}
                    flexwrap="wrap"
                >

                    <AppButton
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        disabled={!training}
                        onClick={onScanIn}
                    >

                        {isMobile ? "IN" : "Scan In"}

                    </AppButton>

                    <AppButton
                        size="small"
                        color="success"
                        startIcon={<PlayArrowIcon />}
                        disabled={!training}
                        onClick={onScanOut}
                    >

                        {isMobile ? "OUT" : "Scan Out"}

                    </AppButton>

                </Stack>

            }
        >

            <Grid>

                <Grid 
                    container 
                    spacing={2}
                    sx={{}}
                >

                    <Grid size={{ xs:6 }}>

                        <BoxItem
                            icon={<SchoolIcon color="primary" />}
                            title="Training"
                            value={training.title}
                        />

                    </Grid>

                    <Grid size={{ xs:6 }}>

                        <BoxItem
                            icon={<PersonIcon color="primary" />}
                            title="Trainer"
                            value={training.trainerName}
                        />

                    </Grid>

                    <Grid size={{ xs:6 }}>

                        <BoxItem
                            icon={<MeetingRoomIcon color="primary" />}
                            title="Ruangan"
                            value={training.roomName}
                        />

                    </Grid>

                    <Grid size={{ xs:6 }}>

                        <BoxItem
                            icon={<CalendarMonthIcon color="primary" />}
                            title="Tanggal"
                            value={dayjs(training.startDate).format("DD MMM YYYY")}
                        />

                    </Grid>

                    {!isMobile && (

                        <>

                            <Grid size={{ xs: 6 }}>

                                <BoxItem
                                    icon={<LoginIcon color="success" />}
                                    title="Scan Masuk"
                                    value={`${scanInCount} Peserta`}
                                />

                            </Grid>

                            <Grid size={{ xs: 6 }}>

                                <BoxItem
                                    icon={<LogoutIcon color="error" />}
                                    title="Scan Pulang"
                                    value={`${scanOutCount} Peserta`}
                                />

                            </Grid>

                        </>

                    )}

                </Grid>

            </Grid>

        </AppCard>

    );

}

function BoxItem({ icon, title, value }) {

    return (

        <Stack
            direction="row"
            spacing={1.25}
            alignItems="center"
            sx={{
                p: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                height: "100%"
            }}
        >

            {icon}

            <Stack
                spacing={0.2}
                sx={{
                    minWidth: 0,
                    flex: 1
                }}
            >

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    {title}

                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    noWrap
                    title={value}
                >

                    {value}

                </Typography>

            </Stack>

        </Stack>

    );

}

export default AttendanceInfo;