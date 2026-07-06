import { useMemo, useState } from "react";
import {Box, Chip, Typography} from "@mui/material";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppCard from "../../components/common/Card/AppCard";
import AppButton from "../../components/common/Button/AppButton";
import CalendarToolbar from "./components/CalendarToolbar";
import TrainingDialog from "./components/TrainingDialog";
import TrainingDetailDialog from "./components/TrainingDetailDialog";

import calendarService from "../../services/calendarService";

import { createDummyTrainings } from "../../constants/scheduleData";


const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
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
    date: dayjs().format("YYYY-MM-DD"),
    time: "09:00",
    room: "Training Room A",
    trainer: ""
};

function Schedule() {
    const [month, setMonth] = useState(dayjs().startOf("month"));
    const [trainings, setTrainings] = useState(createDummyTrainings);
    const [holidays, setHolidays] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(initialForm);

    const calendarDays = useMemo(() => {
        const leadingDays = month.day();
        const daysInMonth = month.daysInMonth();

        return [
            ...Array.from({ length: leadingDays }, () => null),
            ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
        ];
    }, [month]);

    const handleChange = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setTrainings((current) => editingId
            ? current.map((training) => (
                training.id === editingId ? { ...training, ...form } : training
            ))
            : [...current, { ...form, id: Date.now() }]
        );
        setMonth(dayjs(form.date).startOf("month"));
        setForm(initialForm);
        setEditingId(null);
        setDialogOpen(false);
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
            date: selectedTraining.date,
            time: selectedTraining.time,
            room: selectedTraining.room,
            trainer: selectedTraining.trainer
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

    return (
        <>
            <PageHeader
                title="Training Schedule"
                subtitle="Kelola jadwal dan agenda training."
                action={(
                    <AppButton
                        startIcon={<AddIcon />}
                        onClick={openCreateDialog}
                    >
                        Tambah Training
                    </AppButton>
                )}
            />

            <AppCard
                title={`${MONTHS[month.month()]} ${month.year()}`}
                action={
                    <CalendarToolbar
                        month={month}
                        MONTHS={MONTHS}
                        YEARS={YEARS}
                        setMonth={setMonth}
                    />
                }
                sx={{ "& .MuiCardContent-root": { p: 0 } }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))"
                    }}
                >
                    {WEEKDAYS.map((day) => (
                        <Box
                            key={day}
                            sx={{
                                py: 1.5,
                                textAlign: "center",
                                bgcolor: "grey.50",
                                borderBottom: 1,
                                borderColor: "divider"
                            }}
                        >
                            <Typography variant="body2" fontWeight={700}>
                                {day}
                            </Typography>
                        </Box>
                    ))}

                    {calendarDays.map((day, index) => {
                        const date = day ? month.date(day).format("YYYY-MM-DD") : null;
                        const dayTrainings = trainings.filter((item) => item.date === date);
                        const isToday = date === dayjs().format("YYYY-MM-DD");

                        return (
                            <Box
                                key={`${day ?? "empty"}-${index}`}
                                sx={{
                                    minHeight: { xs: 90, md: 125 },
                                    p: 1,
                                    borderRight: (index + 1) % 7 === 0 ? 0 : 1,
                                    borderBottom: 1,
                                    borderColor: "divider",
                                    bgcolor: day ? "background.paper" : "grey.50"
                                }}
                            >
                                {day && (
                                    <>
                                        <Box
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                mb: 0.5,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                bgcolor: isToday ? "primary.main" : "transparent",
                                                color: isToday ? "white" : "text.primary"
                                            }}
                                        >
                                            <Typography variant="body2" fontWeight={isToday ? 700 : 400}>
                                                {day}
                                            </Typography>
                                        </Box>

                                        {dayTrainings.map((training) => (
                                            <Chip
                                                key={training.id}
                                                label={`${training.time} ${training.title}`}
                                                color="primary"
                                                size="small"
                                                clickable
                                                onClick={() => setSelectedTraining(training)}
                                                title={`${training.title} - ${training.room} - ${training.trainer}`}
                                                sx={{
                                                    width: "100%",
                                                    mb: 0.5,
                                                    justifyContent: "flex-start",
                                                    "& .MuiChip-label": {
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </AppCard>

            <TrainingDialog
                open={dialogOpen}
                editingId={editingId}
                form={form}
                onChange={handleChange}
                onClose={closeFormDialog}
                onSubmit={handleSubmit}
            />
            
            <TrainingDetailDialog
                training={selectedTraining}
                open={Boolean(selectedTraining)}
                onClose={() => setSelectedTraining(null)}
                onEdit={openEditDialog}
            />
        </>
    );
}

export default Schedule;
