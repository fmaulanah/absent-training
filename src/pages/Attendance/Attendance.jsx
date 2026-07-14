import { useState, useMemo, useEffect, useRef} from "react";
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
import useSnackbar from "../../hooks/useSnackbar";

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
    const [confirmOpenStat, setConfirmOpenStat] = useState(false);
    const [confirmUploadOpen, setConfirmUploadOpen] = useState(false);
    const [pendingTraining, setPendingTraining] = useState(null);
    const [pendingStatus, setPendingStatus] = useState(null);

    const { showSnackbar } = useSnackbar();

    const isToday = selectedTraining ? dayjs(selectedTraining.startDate).isSame(dayjs(), "day") : false;

    const restoredRef = useRef(false);

    useBeforeUnloadGuard(

        attendanceQueue.hasPendingUpload()

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

    const loadTraining = async (showLoading = true) => {

        if (dialogOpen) {

            return;

        }
        
        if (showLoading) {

            setLoading(true);

        }

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
                useYn: item.USE_YN,
                absentStatus: item.ABSENT_STATUS

            }));

            setTrainings(data);

            if (selectedTraining) {

                const updatedTraining = data.find(

                    item => item.id === selectedTraining.id

                );

                setSelectedTraining(updatedTraining ?? null);

            }

        }
        finally {

            if (showLoading) {

                setLoading(false);

            }

        }

    };

    const restoreAttendance = () => {

        const queue = attendanceQueue.getQueueInfo();

        if (!queue) {

            return;

        }

        const training = trainings.find(

            item=>item.id===queue.scheduleId

        );
        
        if (!training) {

            

            attendanceQueue.clearQueue();

            return;

        }

        setSelectedTraining(training);

        console.log("Status :", queue.status);
        setScanType( queue.status === "SCAN_IN" ? "IN" : "OUT" );
        setDialogOpen(true);

        showSnackbar(

            "Attendance sebelumnya berhasil dipulihkan.",
            "info"

        );

    };

    const handleMonthChange = (event) => {

        if (attendanceQueue.hasPendingUpload()) {

            setConfirmOpen(true);
            return;

        }

        setMonth(current =>

            current.month(Number(event.target.value) - 1)

        );

    };

    const handleYearChange = (event) => {

        if (attendanceQueue.hasPendingUpload()) {

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

    const handleRequestUpload = () => {

        const queue = attendanceQueue.getNotUploadedQueue();

        if (!queue.length) {

            showSnackbar(

                "Semua attendance sudah diupload.",

                "info"

            );

            return;

        }

        setConfirmUploadOpen(true);

    };

    const handleUpload = async () => {

        setConfirmUploadOpen(false);

        const queue = attendanceQueue.getNotUploadedQueue();

        const uploadedQueue = [];

        if (!queue.length) {

            showSnackbar(

                "Semua attendance sudah diupload.",
                "info"

            );

            return;

        }

        try {

            setUploading(true);

            for (const scan of queue) {

                try {

                    await attendanceService.saveScan(scan);
                    uploadedQueue.push(scan);

                }
                catch (error) {

                    console.error(

                        "Upload gagal :",
                        scan,
                        error

                    );

                }

            }

            attendanceQueue.removeUploaded(uploadedQueue);

            setQueueVersion(current => current + 1);

            const failedCount = queue.length - uploadedQueue.length;

            if (failedCount === 0) {

                showSnackbar(

                    `${uploadedQueue.length} attendance berhasil diupload.`,

                    "success"

                );

            }
            else {

                showSnackbar(

                    `${uploadedQueue.length} berhasil, ${failedCount} gagal. Silakan upload kembali.`,

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

            attendanceQueue.hasPendingUpload() &&
            queueInfo?.scheduleId !== training.id

        ) {

            setPendingTraining(training);
            setConfirmOpen(true);
            return;

        }

        setSelectedTraining(training);

        

    };

    const handleRequestFinish = () => {

        const progress = attendanceQueue.getProgress({

            scheduleId: selectedTraining.id,
            scanType

        });

        if (progress.uploaded !== progress.scanned) {

            showSnackbar(

                "Masih ada attendance yang belum diupload.",
                "warning"

            );

            return;

        }

        setPendingStatus(

            scanType === "IN" ? "O" : "F"

        );

        setConfirmOpenStat(true);

    };

    const handleFinishScan = async () => {

        try {

            console.log("training :", selectedTraining.id);
            console.log("status :", pendingStatus);

            await attendanceService.setAbsentStatus(

                selectedTraining.id,
                pendingStatus

            );

            await loadTraining();

            setConfirmOpenStat(false);

            setDialogOpen(false);

            if (pendingStatus === "F") {

                attendanceQueue.clearQueue();
                setQueueVersion(current => current + 1);

            }

            showSnackbar(

                pendingStatus === "O"

                    ? "Scan IN berhasil diselesaikan."

                    : "Attendance berhasil diselesaikan.",

                "success"

            );

        }
        catch (error) {

            console.error(error);

            showSnackbar(

                "Gagal mengubah status attendance.",

                "error"

            );

        }

    };
    
    useEffect(() => {

        loadTraining();

        const timer = setInterval(() => {

            loadTraining(false);

        }, 30000);

        return () => clearInterval(timer);

    }, [month]);

    

    useEffect(() => {

        if (restoredRef.current) {

            return;

        }

        if (!trainings.length) {

            return;

        }

        restoredRef.current = true;

        restoreAttendance();

    }, [trainings]);

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
                isToday={isToday}
                onScanIn={() => {

                    setScanType("IN");

                    setDialogOpen(true);

                }}
                onScanOut={() => {

                    setScanType("OUT");

                    setDialogOpen(true);

                }}
                onUpload={handleRequestUpload}

            />

            <AttendanceDialog

                open={dialogOpen}
                training={selectedTraining}
                scanType={scanType}
                queueVersion={queueVersion}
                onClose={() => setDialogOpen(false)}
                onQueueChanged={() =>

                    setQueueVersion(current => current + 1)

                }
                onRequestFinish={handleRequestFinish}

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

            <ConfirmDialog

                open={confirmUploadOpen}
                title="Upload Attendance"
                message={`Upload ${attendanceQueue.getNotUploadedQueue().length} attendance ke server?`}
                confirmText="Upload"
                cancelText="Batal"
                onConfirm={handleUpload}
                onCancel={() =>

                    setConfirmUploadOpen(false)
                }

            />

            <ConfirmDialog

                open={confirmOpenStat}
                title={

                    pendingStatus === "O" ? "Selesaikan Scan Masuk" : "Selesaikan Attendance"

                }
                message={

                    pendingStatus === "O" ? "Attendance akan berpindah ke Scan Out." : "Attendance akan diselesaikan."

                }
                confirmText="Lanjutkan"
                cancelText="Batal"
                onCancel={() => setConfirmOpenStat(false)}
                onConfirm={handleFinishScan}

            />

        </>

    );

}

export default Attendance;