import { useEffect, useMemo, useState } from "react";
import {Box, Chip, Typography} from "@mui/material";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppCard from "../../components/common/Card/AppCard";
import AppButton from "../../components/common/Button/AppButton";
import ScheduleSkeleton from "../../components/common/Loading/ScheduleSkeleton";

import ScheduleToolbar from "./components/ScheduleToolbar";
import ScheduleCalendar from "./components/ScheduleCalendar";
import ScheduleList from "./components/ScheduleList";
import ScheduleDayDialog from "./components/ScheduleDayDialog";
import ScheduleTrainingDialog from "./components/ScheduleTrainingDialog";
import ScheduleTrainingDetailDialog from "./components/ScheduleTrainingDetailDialog";

import calendarService from "../../services/calendarService";
import trainerService from "../../services/trainerService";
import roomService from "../../services/roomService";
import trainingService from "../../services/trainingService";

import useResponsive from "../../hooks/useResponsive";
import useSnackbar from "../../hooks/useSnackbar";


const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const CURRENT_YEAR = dayjs().year();
const YEARS = Array.from(
    { length: CURRENT_YEAR + 10 - 2000 + 1 },
    (_, index) => 2000 + index
);

const initialForm = {

    title: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    room: "TR01",
    trainerId: "",
    trainerName: "",
    memo: "",
    useYn: "Y"

};

function Schedule() {

    const [month, setMonth] = useState(dayjs().startOf("month"));
    const [trainings, setTrainings] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [trainerError, setTrainerError] = useState("");
    const [holidays, setHolidays] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [page, setPage] = useState(1);

    const [isDirty, setIsDirty] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { isMobile } = useResponsive();
    const { showSnackbar } = useSnackbar();

    const [dayDialog, setDayDialog] = useState({

        open: false,
        date: "",
        trainings: []

    });

    const calendarDays = useMemo(() => {
        const leadingDays = month.day();
        const daysInMonth = month.daysInMonth();

        return [
            ...Array.from({ length: leadingDays }, () => null),
            ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
        ];
    }, [month]);

    const holidaySet = useMemo(() => {
        return new Set(
            holidays.map(item => dayjs(item.CAL_DATE, "YYYYMMDD").format("YYYY-MM-DD"))
        );
    }, [holidays]);

    const roomMap = useMemo(() => (

        Object.fromEntries(

            rooms.map(room => [

                room.ROOM_ID,

                room.ROOM_NM

            ])

        )

    ), [rooms]);

    const monthlyTrainings = useMemo(() => (

        trainings.filter(training =>

            dayjs(training.startDate).format("YYYY-MM") ===
            month.format("YYYY-MM")

        )

    ), [trainings, month]);

    const loadHoliday = async () => {

        try {

            const result = await calendarService.getHoliday(month.year());

            setHolidays(result);

        }
        catch (err) {

            console.error(err);

        }

    };

    const loadRoom = async () => {

        try {

            const result = await roomService.getRooms();

            setRooms(result);

            if (result.length > 0) {

                setForm(current => ({

                    ...current,

                    room: current.room || result[0].ROOM_ID

                }));

            }

        }
        catch (err) {

            console.error(err);

        }

    };

    const loadTraining = async (showLoading = true) => {

        if (showLoading) {

            setLoading(true);

        }

        try {

            const result = await trainingService.getTrainings(

                month.format("YYYYMM")

            );

            setTrainings(

                result.map(item => ({

                    id: item.SCHEDULE_ID,
                    title: item.SCHEDULE_NM,
                    startDate: dayjs(item.SCHEDULE_START_DT, "YYYYMMDD").format("YYYY-MM-DD"),
                    endDate: dayjs(item.SCHEDULE_END_DT, "YYYYMMDD").format("YYYY-MM-DD"),
                    room: item.ROOM_ID,
                    trainerId: item.TRAINER_EMPID,
                    trainerName: item.TRAINER_EMP_NM,
                    memo: item.MEMO,
                    useYn: item.USE_YN

                }))

            );

        }
        catch (err) {

            console.error(err);

        }
        finally {

            if (showLoading) {

                setLoading(false);

            }

        }

    };

    const handleChange = (event) => {

        setIsDirty(true);

        const { name, value } = event.target;

        setForm((current) => {

            const next = {
                ...current,
                [name]: value
            };

            // Khusus Trainer
            if (name === "trainerId") {

                setTrainerError("");

                next.trainerId = value;
                next.trainerName = "";

            }

            // Jika Start Date lebih besar dari End Date
            if (
                name === "startDate" &&
                next.endDate &&
                value > next.endDate
            ) {

                next.endDate = value;

            }

            // Jika End Date lebih kecil dari Start Date
            if (
                name === "endDate" &&
                next.startDate &&
                value < next.startDate
            ) {

                next.startDate = value;

            }

            return next;

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            if (editingId) {

                await trainingService.updateTraining(

                    editingId,

                    form,

                    roomMap[form.room]

                );

            }
            else {

                await trainingService.saveTraining(

                    form,

                    roomMap[form.room]

                );

            }

            await loadTraining();

            closeFormDialog();

            showSnackbar(

                editingId
                    ? "Training berhasil diperbarui."
                    : "Training berhasil disimpan.",

                "success"

            );

            setIsDirty(false);

        }
        catch (err) {

            console.error(err);

            showSnackbar(
                
                "Gagal menyimpan training.",
                "error"

            );

        }
        finally {

            setSaving(false);

        }

    };

    const handleSearchTrainer = async () => {

        if (!form.trainerId.trim()) {

            setForm(current => ({
                ...current,
                trainerName: ""
            }));

            return;
        }

        try {

            const result = await trainerService.getTrainer(form.trainerId);

            if (!result || result.length === 0) {

                setTrainerError("PIC tidak ditemukan.");

                showSnackbar(

                    "PIC tidak ditemukan.",
                    "warning"

                );

                setForm(current => ({
                    ...current,
                    trainerName: ""
                }));

                return;

            }

            setTrainerError("");

            setForm(current => ({
                ...current,
                trainerName: result[0].EMP_NAME
            }));

        }
        catch (err) {

            console.error(err);

        }

    };

    const handleTrainerKeyDown = async (event) => {

        if (event.key !== "Enter") {

            return;

        }

        event.preventDefault();

        await handleSearchTrainer();

    };

    const handleUseYnChange = (event) => {

        setForm(current => ({

            ...current,

            useYn: event.target.checked ? "Y" : "N"

        }));

    };

    const openCreateDialog = () => {
        setEditingId(null);
        setForm(initialForm);
        setDialogOpen(true);
    };

    const closeFormDialog = () => {
        setDialogOpen(false);
        setEditingId(null);
        setForm(initialForm);
    };

    const openEditDialog = () => {
        setEditingId(selectedTraining.id);
        setForm({
            title: selectedTraining.title,
            startDate: selectedTraining.startDate,
            endDate: selectedTraining.endDate,
            room: selectedTraining.room,
            trainerId: selectedTraining.trainerId ?? "",
            trainerName: selectedTraining.trainerName ?? "",
            memo: selectedTraining.memo ?? "",
            useYn: selectedTraining.useYn ?? "Y"
        });
        
        setSelectedTraining(null);
        setDialogOpen(true);
    };

    useEffect(() => {

        const loadSchedule = async () => {

            setLoading(true);

            try {

                await Promise.all([

                    loadHoliday(),
                    loadRoom(),
                    loadTraining(false)

                ]);

            }
            finally {

                setLoading(false);

            }

        };

        loadSchedule();

    }, [month]);

    if (loading) {

        return (

            <>

                <PageHeader
                    title="Training Schedule"
                    subtitle="Kelola jadwal dan agenda training."
                />

                <ScheduleSkeleton />

            </>

        );

    }

    return (
        <>
            <PageHeader
                title="Training Schedule"
                subtitle="Kelola jadwal dan agenda training."
            />

            {isMobile ? (

                <Box
                    sx={{
                        // display: "flex",
                        // flexDirection: "column",
                        // minHeight: "calc(100vh - 180px)"
                    }}
                >

                    <Box
                        sx={{
                            // mb: 2
                            // flex: 1,
                            // display: "flex"
                        }}
                    >

                        <ScheduleToolbar 
                            month={month}
                            MONTHS={MONTHS}
                            YEARS={YEARS}
                            setMonth={setMonth}
                            onAddTraining={openCreateDialog}
                            onRefresh={loadTraining}
                        />

                    </Box>

                    <Box
                        sx={{
                            // flex: 1,
                            // display: "flex"
                        }}
                    >

                        <ScheduleList
                            trainings={monthlyTrainings}
                            roomMap={roomMap}
                            onSelectTraining={setSelectedTraining}
                        />

                    </Box>

                </Box>

            ) : (

                <AppCard
                    title=' '
                    action={
                        <ScheduleToolbar
                            month={month}
                            MONTHS={MONTHS}
                            YEARS={YEARS}
                            setMonth={setMonth}
                            onAddTraining={openCreateDialog}
                            onRefresh={loadTraining}
                        />
                    }
                    sx={{
                        "& .MuiCardContent-root": {
                            p: 0
                        }
                    }}
                >
                    <ScheduleCalendar
                        month={month}
                        calendarDays={calendarDays}
                        trainings={trainings}
                        holidaySet={holidaySet}
                        onSelectTraining={setSelectedTraining}
                        onShowMore={(date, trainings) =>
                            setDayDialog({

                                open: true,
                                date,
                                trainings
                            })
                        }
                    />
                </AppCard>

            )}

            <ScheduleTrainingDialog
                open={dialogOpen}
                editingId={editingId}
                form={form}
                rooms={rooms}
                trainerError={trainerError}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
                isDirty={isDirty}
                setIsDirty={setIsDirty}
                onChange={handleChange}
                onSearchTrainer={handleSearchTrainer}
                onTrainerKeyDown={handleTrainerKeyDown}
                onSubmit={handleSubmit}
                onUseYnChange={handleUseYnChange}
                onClose={closeFormDialog}
            />

            <ScheduleTrainingDetailDialog
                training={selectedTraining}
                rooms={rooms}
                open={Boolean(selectedTraining)}
                onClose={() => setSelectedTraining(null)}
                onEdit={openEditDialog}
            />

            <ScheduleDayDialog

                open={dayDialog.open}

                date={dayDialog.date}

                trainings={dayDialog.trainings}

                onClose={() =>

                    setDayDialog({

                        open: false,

                        date: "",

                        trainings: []

                    })

                }

                onSelectTraining={setSelectedTraining}

            />
        </>
    );
}

export default Schedule;
