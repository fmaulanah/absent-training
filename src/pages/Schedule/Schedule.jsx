import { useEffect, useMemo, useState } from "react";
import {Box, Chip, Typography} from "@mui/material";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppCard from "../../components/common/Card/AppCard";
import AppButton from "../../components/common/Button/AppButton";
import CalendarToolbar from "./components/CalendarToolbar";
import TrainingDialog from "./components/TrainingDialog";
import TrainingDetailDialog from "./components/TrainingDetailDialog";
import ScheduleList from "./components/ScheduleList";
import CalendarGrid from "./components/CalendarGrid";
import DayTrainingDialog from "./components/DayTrainingDialog";

import calendarService from "../../services/calendarService";
import trainerService from "../../services/trainerService";
import roomService from "../../services/roomService";
import trainingService from "../../services/trainingService";

import useResponsive from "../../hooks/useResponsive";


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
    const [saving, setSaving] = useState(false);

    const [dayDialog, setDayDialog] = useState({

        open: false,
        date: "",
        trainings: []

    });

    const { isMobile } = useResponsive();

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

            training.useYn === "Y" &&

            dayjs(training.startDate).format("YYYY-MM") ===
            month.format("YYYY-MM")

        )

    ), [trainings, month]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((current) => {

            if (name === "trainerId") {

                setTrainerError("");

                return {
                    ...current,
                    trainerId: value,
                    trainerName: ""
                };

            }

            return {
                ...current,
                [name]: value
            };

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

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setSaving(false);

        }

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

    const loadHoliday = async () => {

        try {

            const result = await calendarService.getHoliday(month.year());

            setHolidays(result);

        }
        catch (err) {

            console.error(err);

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

                setTrainerError("Trainer tidak ditemukan.");

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

    const loadTraining = async () => {

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

    };

    useEffect(() => {

        loadHoliday();
        loadRoom();
        loadTraining();

    }, [month]);

    return (
        <>
            <PageHeader
                title="Training Schedule"
                subtitle="Kelola jadwal dan agenda training."
            />

            {isMobile ? (

                <>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <CalendarToolbar
                            month={month}
                            MONTHS={MONTHS}
                            YEARS={YEARS}
                            setMonth={setMonth}
                            onAddTraining={openCreateDialog}
                            onRefresh={loadTraining}
                        />
                    </Box>

                    <ScheduleList
                        trainings={monthlyTrainings}
                        roomMap={roomMap}
                        onSelectTraining={setSelectedTraining}
                    />
                </>

            ) : (

                <AppCard
                    title=' '
                    action={
                        <CalendarToolbar
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
                    <CalendarGrid
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

            <TrainingDialog
                open={dialogOpen}
                editingId={editingId}
                form={form}
                rooms={rooms}
                onChange={handleChange}
                onSearchTrainer={handleSearchTrainer}
                onTrainerKeyDown={handleTrainerKeyDown}
                onClose={closeFormDialog}
                onSubmit={handleSubmit}
                trainerError={trainerError}
            />

            <TrainingDetailDialog
                training={selectedTraining}
                rooms={rooms}
                open={Boolean(selectedTraining)}
                onClose={() => setSelectedTraining(null)}
                onEdit={openEditDialog}
            />

            <DayTrainingDialog

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
