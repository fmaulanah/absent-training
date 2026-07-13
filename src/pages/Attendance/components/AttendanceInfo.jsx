import dayjs from "dayjs";

import { Chip, Grid, Stack, Typography } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
    onScanOut,
    onUpload,
    uploading

}) {

    const { isMobile } = useResponsive();

    const status = training?.absentStatus;

    const canScanIn = !status || status === "I";
    const canScanOut = status === "O";
    const isFinished = status === "F";

    if (!training) {

        return (

            <AppCard
                title=" "
                sx={{ mt: 3 }}
                action={

                    <Stack
                        direction="row"
                        spacing={1}
                        // flexwrap="wrap"
                    >

                        <AppButton
                            size="small"
                            startIcon={<PlayArrowIcon />}
                            onClick={onScanIn}
                            disabled={true}
                        >

                            {isMobile ? "IN" : "Scan In"}

                        </AppButton>

                        <AppButton
                            size="small"
                            color="success"
                            startIcon={<PlayArrowIcon />}
                            onClick={onScanOut}
                            disabled={true}
                        >

                            {isMobile ? "OUT" : "Scan Out"}

                        </AppButton>

                        <AppButton

                            size="small"
                            color="secondary"
                            disabled={true}
                            onClick={onUpload}
                            sx={{
                                minWidth: 40,
                                width: 40,
                                height: 40,
                                p: 0,
                                boxShadow: "none"
                            }}
                        >

                            <CloudUploadIcon />

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
            title=" "
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
                        onClick={onScanIn}
                        disabled={!canScanIn}
                    >

                        {isMobile ? "IN" : "Scan In"}

                    </AppButton>

                    <AppButton
                        size="small"
                        color="success"
                        startIcon={<PlayArrowIcon />}
                        onClick={onScanOut}
                        disabled={!canScanOut}
                    >

                        {isMobile ? "OUT" : "Scan Out"}

                    </AppButton>

                    <AppButton

                        size="small"
                        color="secondary"
                        onClick={onUpload}
                        sx={{
                            minWidth: 40,
                            width: 40,
                            height: 40,
                            p: 0,
                            boxShadow: "none"
                        }}
                    >

                        <CloudUploadIcon />

                    </AppButton>

                </Stack>

            }
        >

            <Grid>

                <Grid 
                    container 
                    spacing={1}
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

                    {/* {!isMobile && (

                        <> */}

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

                        {/* </>

                    )} */}

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
            alignitems="center"
            sx={{
                p: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                height: "100%",
                width: "100%"
            }}
        >

            {icon}

            <Stack
                sx={{
                    minWidth: 0,
                    flex: 1
                }}
            >

                <Typography
                    variant="caption"
                    fontWeight={800}
                    color="text.secondary"
                >

                    {title}

                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    flexwrap="wrap"
                    title={value}
                >

                    {value}

                </Typography>

            </Stack>

        </Stack>

    );

}

export default AttendanceInfo;