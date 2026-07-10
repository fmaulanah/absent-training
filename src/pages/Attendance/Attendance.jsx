import { useState, useMemo,  useEffect} from "react";
import dayjs from "dayjs";

import { Typography, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppButton from "../../components/common/Button/AppButton";

import AttendanceFilter from "./components/AttendanceFilter";
import AttendanceInfo from "./components/AttendanceInfo";
import AttendanceDialog from "./components/AttendanceDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import attendanceService from "../../services/attendanceService";

import attendanceQueue from "../../utils/attendanceQueue";

import useBeforeUnloadGuard from "../../hooks/useBeforeUnloadGuard";

function Attendance() {

    const [month, setMonth] = useState(dayjs());
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [scanType, setScanType] = useState("IN");
    const [queueVersion, setQueueVersion] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingTraining, setPendingTraining] = useState(null);

    useBeforeUnloadGuard(

        attendanceQueue.getCount() > 0

    );

    const scanInCount = useMemo(() =>

        selectedTraining

            ? attendanceQueue.countQueue({

                scheduleId: selectedTraining.id,

                scanType: "IN"

            })

            : 0,

        [selectedTraining, queueVersion]

    );

    const scanOutCount = useMemo(() =>

        selectedTraining

            ? attendanceQueue.countQueue({

                scheduleId: selectedTraining.id,

                scanType: "OUT"

            })

            : 0,

        [selectedTraining, queueVersion]

    );

    const loadTraining = async () => {

        try {

            setLoading(true);

            const result = await attendanceService.getTrainings(

                month.format("YYYYMM")

            );

            const data = result.map(item => ({

                id: item.SCHEDULE_ID,
                title: item.SCHEDULE_NM,
                startDate: dayjs(item.SCHEDULE_START_DT, "YYYYMMDD").format("YYYY-MM-DD"),
                endDate: dayjs(item.SCHEDULE_END_DT, "YYYYMMDD").format("YYYY-MM-DD"),
                room: item.ROOM_ID,
                roomName: item.ROOM_NAME,
                trainerId: item.TRAINER_EMPID,
                trainerName: item.TRAINER_EMP_NM,
                memo: item.MEMO,
                useYn: item.USE_YN

            }));

            setTrainings(data);
            setSelectedTraining(null);

        }
        finally {

            setLoading(false);

        }

    };

    const handleMonthChange = (event) => {

        if (attendanceQueue.getCount() > 0) {

            setConfirmOpen(true);
            return;

        }

        setMonth(current =>

            current.month(Number(event.target.value) - 1)

        );

    };

    const handleYearChange = (event) => {

        if (attendanceQueue.getCount() > 0) {

            setConfirmOpen(true);
            return;

        }
        
        setMonth(current =>

            current.year(Number(event.target.value))

        );

    };

    const handleDiscardQueue = () => {

        attendanceQueue.clearQueue();

        setQueueVersion(current => current + 1);

    };

    const handleUpload = async () => {

        const queue = attendanceQueue.getQueue();
        const failedQueue = [];

        if (!queue.length) {

            showSnackbar(

                "Tidak ada data yang akan diupload.",

                "warning"

            );

            return;

        }

        try {

            setUploading(true);

            for (const scan of queue) {

                try 
                {

                    await attendanceService.saveScan(scan);

                }
                catch {

                    console.error("Upload gagal :", scan, error);
                    failedQueue.push(scan);

                }

            }

            if (failedQueue.length === 0) {

                attendanceQueue.clearQueue();

                setQueueVersion(current => current + 1);

                showSnackbar(

                    `${queue.length} attendance berhasil diupload.`,

                    "success"

                );

            }
            else {

                attendanceQueue.replaceQueue(failedQueue);

                setQueueVersion(current => current + 1);

                showSnackbar(

                    `${queue.length - failedQueue.length} berhasil, ${failedQueue.length} gagal. Silakan upload kembali.`,

                    "warning"

                );

            }

        }
        catch (error) {

            console.error(error);

            showSnackbar(

                "Upload attendance gagal.",

                "error"

            );

        }
        finally {

            setUploading(false);

        }

    };

    const handleTrainingChange = (event) => {

        console.log("CHANGE", event.target.value);

        const training = trainings.find(

            item => item.id === event.target.value

        );

        if (!training) {

            return;

        }

        const queueInfo = attendanceQueue.getQueueInfo();

        if (

            queueInfo && queueInfo.scheduleId !== training.id

        ) {

            setPendingTraining(training);
            setConfirmOpen(true);
            return;

        }

        setSelectedTraining(training);

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
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
                onTrainingChange={handleTrainingChange}

            />

            <AttendanceInfo

                training={selectedTraining}
                scanInCount={scanInCount}
                scanOutCount={scanOutCount}
                onScanIn={() => {

                    setScanType("IN");

                    setDialogOpen(true);

                }}
                onScanOut={() => {

                    setScanType("OUT");

                    setDialogOpen(true);

                }}
                onUpload={handleUpload}

            />

            <AttendanceDialog

                open={dialogOpen}
                training={selectedTraining}
                scanType={scanType}
                cfmOpen={confirmOpen}
                onClose={() => setDialogOpen(false)}
                onQueueChanged={() =>

                    setQueueVersion(current => current + 1)

                }

            />

            <ConfirmDialog

                open={confirmOpen}
                title="Attendance Belum Diupload"
                message={`Masih ada attendance "${attendanceQueue.getScheduleName()}" yang belum diupload.`}
                confirmText="Hapus"
                cancelText="Batal"
                onConfirm={() => {

                    attendanceQueue.clearQueue();
                    setQueueVersion(current => current + 1);
                    setSelectedTraining(pendingTraining);
                    setPendingTraining(null);
                    setConfirmOpen(false);

                }}

                onCancel={() => {

                    setPendingTraining(null);
                    setConfirmOpen(false);

                }}

            />

        </>

    );

}

export default Attendance;