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

import useResponsive from "../../hooks/useResponsive";

function Dashboard() {

    const navigate = useNavigate();
    const trainings = createDummyTrainings();
    const today = dayjs().format("YYYY-MM-DD");
    const currentMonth = dayjs().format("YYYY-MM");
    
    const monthlyTrainings = trainings.filter((training) => training.startDate.startsWith(currentMonth));
    const todayTrainings = trainings.filter((training) => training.startDate === today);
    const upcomingTrainings = trainings.filter(training => training.useYn === "Y" && training.startDate >= today);

    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

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

                <Grid size={12}>
                    <AppCard
                        title="Training Mendatang"
                        action={(
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        md: "row"
                                    },
                                    alignItems: {
                                        xs: "stretch",
                                        md: "center"
                                    },
                                    gap: 1.5,
                                    width: {
                                        xs: "100%",
                                        md: "auto"
                                    }
                                }}
                            >

                                <TextField
                                    select
                                    size="small"
                                    label="Ruangan"
                                    value={selectedRoom}
                                    onChange={(event) => setSelectedRoom(event.target.value)}
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            md: 180
                                        }
                                    }}
                                >

                                    <MenuItem value="">
                                        SEMUA RUANGAN
                                    </MenuItem>

                                    {rooms.map(room => (

                                        <MenuItem
                                            key={room.ROOM_ID}
                                            value={room.ROOM_ID}
                                        >
                                            {room.ROOM_NM}
                                        </MenuItem>

                                    ))}

                                </TextField>

                                <AppButton
                                    startIcon={<CalendarMonthIcon />}
                                    onClick={() => navigate("/schedule")}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            md: "auto"
                                        }
                                    }}
                                >
                                    Buka Schedule
                                </AppButton>

                            </Box>
                        )}
                    >
                        {filteredTrainings.length === 0 ? (
                            <Box sx={{ py: 4, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                    Belum ada training mendatang.
                                </Typography>
                            </Box>
                        ) : (
                            <List disablePadding>
                                {filteredTrainings.map((training, index) => (
                                    <Box key={training.id}>
                                        <ListItem>
                                            <Box
                                                sx={{
                                                    width: "100%"
                                                }}
                                            >
                                                <ListItemText
                                                    primary={training.title}
                                                    secondary={`${dayjs(training.startDate).format("DD/MM/YYYY")} •  ${training.trainerName}`}
                                                    slotProps={{
                                                        primary: { fontWeight: 700 },
                                                        secondary: { mt: 0.5 }
                                                    }}
                                                />

                                                <Chip
                                                    label={roomMap[training.room] ?? training.room}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{
                                                        mt: 1,
                                                        alignSelf: "flex-start"
                                                    }}
                                                />
                                            </Box>

                                        </ListItem>
                                        {index < filteredTrainings.length - 1 && <Divider />}
                                    </Box>
                                ))}
                            </List>
                        )}
                    </AppCard>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
