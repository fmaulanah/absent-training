import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Box, Chip, Stack, Typography, Pagination, IconButton } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AppCard from "../../../components/common/Card/AppCard";

const PAGE_SIZE = 2;

function ScheduleList({ trainings, roomMap, onSelectTraining }) {

    const [page, setPage] = useState(1);

    useEffect(() => {

        setPage(1);

    }, [trainings]);

    const totalPages = Math.ceil(trainings.length / PAGE_SIZE);

    const pagedTrainings = trainings.slice(

        (page - 1) * PAGE_SIZE,

        page * PAGE_SIZE

    );

    if (!trainings.length) {

        return (

            <Box
                sx={{
                    p: 4,
                    textAlign: "center"
                }}
            >

                <Typography color="text.secondary">

                    Belum ada training.

                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%"
            }}
        >

            <Stack
                spacing={2}
                sx={{
                    flex: 1
                }}
            >

                {pagedTrainings.map(training => (

                    <AppCard
                        key={training.id}
                        sx={{
                            width: "100%",
                            cursor: "pointer",
                            bgcolor:
                                training.useYn === "Y"
                                    ? "background.paper"
                                    : "grey.300",
                            "&:hover": {
                                boxShadow: 6
                            }
                        }}
                    >

                        <Box
                            onClick={() => onSelectTraining(training)}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignitems: "flex-start"
                            }}
                        >

                            <Box sx={{ flex: 1 }}>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                    color={
                                        training.useYn === "Y"
                                            ? "text.primary"
                                            : "text.disabled"
                                    }
                                >

                                    {training.title}

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

                                        {dayjs(training.startDate).format("DD MMM YYYY")}

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
                                        color={
                                            training.useYn === "Y"
                                                ? "text.primary"
                                                : "text.secondary"
                                        }
                                    >

                                        {training.trainerName}

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
                                            roomMap[training.room] ??
                                            training.room
                                        }
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />

                                    <Chip
                                        label={
                                            training.useYn === "Y"
                                                ? "Aktif"
                                                : "Non Aktif"
                                        }
                                        color={
                                            training.useYn === "Y"
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

            {totalPages > 1 && (

                <Box
                    sx={{
                        mt: "auto",
                        pt: 2,
                        display: "flex",
                        justifyContent: "center"
                    }}
                >

                    {totalPages > 1 && (

                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                alignitems: "center",
                                justifyContent: "center",
                                gap: 2
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

                    )}

                </Box>

            )}

        </Box>

    );

}

export default ScheduleList;