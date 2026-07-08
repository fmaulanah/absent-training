import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";

import { Typography, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppButton from "../../components/common/Button/AppButton";

import AttendanceFilter from "./components/AttendanceFilter";
import AttendanceInfo from "./components/AttendanceInfo";
import AttendanceDialog from "./components/AttendanceDialog";

import attendanceService from "../../services/attendanceService";

function Attendance() {

    const [month, setMonth] = useState(dayjs());
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const loadTraining = async () => {

        try {

            setLoading(true);

            const result = await attendanceService.getTrainings(

                month.format("YYYYMM")

            );

            const data = result.map(item => ({

                id: item.SCHEDULE_ID,

                title: item.SCHEDULE_NM,

                startDate: dayjs(

                    item.SCHEDULE_START_DT,

                    "YYYYMMDD"

                ).format("YYYY-MM-DD"),

                endDate: dayjs(

                    item.SCHEDULE_END_DT,

                    "YYYYMMDD"

                ).format("YYYY-MM-DD"),

                room: item.ROOM_ID,

                roomName: item.ROOM_NAME,

                trainerId: item.TRAINER_EMPID,

                trainerName: item.TRAINER_EMP_NM,

                memo: item.MEMO,

                useYn: item.USE_YN

            }));

            setTrainings(data);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTraining();

    }, [month]);

    return (

        <>

            <PageHeader
                title="Attendance"
                subtitle="Kelola absensi peserta training."
            />

            <AttendanceFilter

                month={month.month() + 1}
                year={month.year()}
                training={selectedTraining}
                trainings={trainings.filter(

                    item => item.useYn === "Y"

                )}
                onMonthChange={() => {}}
                onYearChange={() => {}}
                onTrainingChange={(event) => {

                    const training = trainings.find(

                        item => item.id === event.target.value

                    );

                    setSelectedTraining(training);

                }}
                //onRefresh={loadTraining}

            />

            <AttendanceInfo

                training={selectedTraining}

            />

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >

                <AppButton
                    startIcon={<PlayArrowIcon />}
                    disabled={!selectedTraining}
                    onClick={() => setDialogOpen(true)}
                >

                    Mulai Absen

                </AppButton>

            </Box>

            <AttendanceDialog

                open={dialogOpen}

                training={selectedTraining}

                onClose={() => setDialogOpen(false)}

            />

        </>

    );

}

export default Attendance;