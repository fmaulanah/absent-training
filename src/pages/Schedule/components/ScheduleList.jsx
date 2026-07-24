import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Box, Chip, Stack, Typography, Pagination, IconButton } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AppCard from "../../../components/common/Card/AppCard";

const PAGE_SIZE = 2;

function ScheduleList({ agendas, roomMap, onSelectAgenda }) {

    const [page, setPage] = useState(1);

    useEffect(() => {

        setPage(1);

    }, [agendas]);

    const totalPages = Math.ceil(agendas.length / PAGE_SIZE);

    const pagedAgendas = agendas.slice(

        (page - 1) * PAGE_SIZE,

        page * PAGE_SIZE

    );

    if (!agendas.length) {

        return (

            <Box
                sx={{
                    p: 4,
                    textAlign: "center"
                }}
            >

                <Typography color="text.secondary">

                    Belum ada agenda.

                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}
        >

            <Box
                sx={{
                    mt: "auto",
                    // pt: 2,
                    display: "flex",
                    justifyContent: "right"
                }}
            >

                <Box
                    sx={{
                        // mt: 3,
                        display: "flex",
                        alignitems: "right",
                        justifyContent: "flex-start",
                        // gap: 1
                    }}
                >

                    <IconButton

                        disabled={page === 1}

                        onClick={() =>

                            setPage(current => current - 1)

                        }

                    >

                        <ChevronLeftIcon />

                    </IconButton>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                            mt:1,
                            // minWidth: 60,
                            textAlign: "center"
                        }}
                    >

                        {page} / {totalPages}

                    </Typography>

                    <IconButton

                        disabled={page === totalPages}

                        onClick={() =>

                            setPage(current => current + 1)

                        }

                    >

                        <ChevronRightIcon />

                    </IconButton>

                </Box>

            </Box>

            <Stack
                spacing={2}
                sx={{
                    flex: 1
                }}
            >

                {pagedAgendas.map(agenda => (

                    <AppCard
                        key={agenda.id}
                        sx={{
                            width: "100%",
                            cursor: "pointer",
                            bgcolor:
                                agenda.useYn === "Y"
                                    ? "background.paper"
                                    : "grey.300",
                            "&:hover": {
                                boxShadow: 6
                            }
                        }}
                    >

                        <Box
                            onClick={() => onSelectAgenda(agenda)}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignitems: "flex-start"
                            }}
                        >

                            <Box sx={{ 
                                flex: 1 
                            }}>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                    color={
                                        agenda.useYn === "Y" ? "text.primary" : "text.disabled"
                                    }
                                >

                                    {agenda.title}

                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignitems: "center",
                                        gap: 1,
                                        mt: 1
                                    }}
                                >

                                    <CalendarMonthIcon fontSize="small" />

                                    <Typography variant="body2">

                                        {dayjs(agenda.startDate).format("DD MMM YYYY")}

                                    </Typography>

                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignitems: "center",
                                        gap: 1,
                                        mt: 1
                                    }}
                                >

                                    <PersonIcon fontSize="small" />

                                    <Typography
                                        variant="body2"
                                        wrap = "true"
                                        color={
                                            agenda.useYn === "Y"
                                                ? "text.primary"
                                                : "text.secondary"
                                        }
                                    >

                                        {agenda.trainerName}

                                    </Typography>

                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        mt: 2,
                                        flexWrap: "wrap"
                                    }}
                                >

                                    <Chip
                                        label={
                                            roomMap[agenda.room] ??
                                            agenda.room
                                        }
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />

                                    <Chip
                                        label={
                                            agenda.useYn === "Y"
                                                ? "Aktif"
                                                : "Non Aktif"
                                        }
                                        color={
                                            agenda.useYn === "Y"
                                                ? "success"
                                                : "default"
                                        }
                                        size="small"
                                    />

                                </Box>

                            </Box>

                            <ChevronRightIcon color="action" />

                        </Box>

                    </AppCard>

                ))}

            </Stack>

        </Box>

    );

}

export default ScheduleList;