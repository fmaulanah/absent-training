import Grid from "@mui/material/Grid";
import {Box, Chip, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TodayIcon from "@mui/icons-material/Today";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import dayjs from "dayjs";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppButton from "../../components/common/Button/AppButton";
import AppCard from "../../components/common/Card/AppCard";
import DashboardStat from "./components/DashboardStat";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { createDummyTrainings } from "../../constants/scheduleData";

import roomService from "../../services/roomService";
import trainingService from "../../services/trainingService";

import useResponsive from "../../hooks/useResponsive";

function Dashboard() {

    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

    const today = dayjs().format("YYYY-MM-DD");
    const currentMonth = dayjs().format("YYYYMM");
    
    const monthlyTrainings = trainings.filter(
        training =>
            training.useYn === "Y" &&
            training.startDate.startsWith(dayjs().format("YYYY-MM"))
    );

    const todayTrainings = trainings.filter(
        training =>
            training.useYn === "Y" &&
            training.startDate === today
    );

    const upcomingTrainings = trainings
        .filter(
            training =>
                training.useYn === "Y" &&
                training.startDate >= today
        )
        .sort((a, b) => a.startDate.localeCompare(b.startDate)
    );
        
    const { isMobile } = useResponsive();

    const loadRooms = async () => { 

        try {

            const result = await roomService.getRooms();
            setRooms(result);

        }
        catch (err) {
            console.error(err);
        }

    };

    const loadTraining = async () => {

        try {

            const result = await trainingService.getTrainings(currentMonth);

            setTrainings(

                result.map(item => ({

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

                }))

            );

        }
        catch (err) {

            console.error(err);

        }

    };

    const roomMap = useMemo(() => (

        Object.fromEntries(

            rooms.map(room => [
                room.ROOM_ID,
                room.ROOM_NM
            ])

        )

    ), [rooms]);

    const filteredTrainings = upcomingTrainings.filter(training => {

        if (!selectedRoom) {

            return true;

        }

        return training.room === selectedRoom;

    });

    useEffect(() => {

        loadRooms();
        loadTraining();

    }, []);

    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Ringkasan jadwal training."
            />

            <Grid
                container
                spacing={{
                    xs: 2,
                    md: 3
                }}
            >
                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardStat
                        title="Schedule Bulan Ini"
                        value={monthlyTrainings.length}
                        icon={<CalendarMonthIcon fontSize="large" />}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardStat
                        title="Training Hari Ini"
                        value={todayTrainings.length}
                        icon={<TodayIcon fontSize="large" />}
                        color="info.main"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardStat
                        title="Training Mendatang"
                        value={upcomingTrainings.length}
                        icon={<EventAvailableIcon fontSize="large" />}
                        color="success.main"
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default Dashboard;
