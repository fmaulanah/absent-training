import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography, IconButton } from "@mui/material";

import {

    formatCompletion,
    formatStatus,
    formatTrainingDate,
    displayValue

} from "../../../utils/formatter/attendanceHistoryFormatter";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function AttendanceHistoryList({ rows, loading, onDetail }) 
{
    const PAGE_SIZE = 2;

    const [page, setPage] = useState(1);

    useEffect(() => {

        setPage(1);

    }, [rows]);

    const totalPages = Math.ceil(rows.length / PAGE_SIZE);

    const pagedRows = rows.slice(

        (page - 1) * PAGE_SIZE,

        page * PAGE_SIZE

    );

    if (loading) {

        return (

            <Card
                sx={{
                    mt:2
                }}
            >

                <CardContent>

                    <Typography align="center">

                        Loading...

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    if (!rows.length) {

        return (

            <Card>

                <CardContent>

                    <Typography
                        align="center"
                        color="text.secondary"
                    >

                        No Attendance History

                    </Typography>

                </CardContent>

            </Card>

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

        {/* Navigation */}

        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end"
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignitems: "center"
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
                        minWidth: 60,
                        textAlign: "center"
                    }}
                >

                    {page} / {totalPages || 1}

                </Typography>

                <IconButton

                    disabled={page === totalPages || totalPages === 0}

                    onClick={() =>

                        setPage(current => current + 1)

                    }

                >

                    <ChevronRightIcon />

                </IconButton>

            </Box>

        </Box>

            <Stack spacing={2}>

            
                {pagedRows.map(row => (

                        <Card key={row.SCHEDULE_ID}>

                            <CardContent>

                                <Stack spacing={2}>

                                    <Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >

                                            {displayValue(row.TRAINING_NAME)}

                                        </Typography>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignitems="center"
                                            mt={0.5}
                                        >

                                            <CalendarTodayIcon
                                                fontSize="inherit"
                                                color="action"
                                            />

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >

                                                {formatTrainingDate(row.TRAINING_DATE)}

                                            </Typography>

                                        </Stack>

                                    </Box>

                                    <Divider />

                                    <Stack spacing={2}>

                                        <Box>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignitems="center"
                                            >

                                                <PersonIcon
                                                    color="primary"
                                                    fontSize="small"
                                                />

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >

                                                    Trainer

                                                </Typography>

                                            </Stack>

                                            <Typography
                                                fontWeight={600}
                                            >

                                                {displayValue(row.TRAINER_NAME)}

                                            </Typography>

                                        </Box>

                                        <Box>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignitems="center"
                                            >

                                                <MeetingRoomIcon
                                                    color="primary"
                                                    fontSize="small"
                                                />

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >

                                                    Room

                                                </Typography>

                                            </Stack>

                                            <Typography
                                                fontWeight={600}
                                            >

                                                {displayValue(row.ROOM_NAME)}

                                            </Typography>

                                        </Box>

                                    </Stack>

                                    <Divider />

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                flex: 1
                                            }}
                                        >

                                            <CardContent
                                                sx={{
                                                    py: 2
                                                }}
                                            >

                                                <Stack
                                                    spacing={1}
                                                    alignitems="center"
                                                >

                                                    <LoginIcon color="success" />

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >

                                                        Scan In

                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        fontWeight={700}
                                                    >

                                                        {row.SCAN_IN}

                                                    </Typography>

                                                </Stack>

                                            </CardContent>

                                        </Card>

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                flex: 1
                                            }}
                                        >

                                            <CardContent
                                                sx={{
                                                    py: 2
                                                }}
                                            >

                                                <Stack
                                                    spacing={1}
                                                    alignitems="center"
                                                >

                                                    <LogoutIcon color="error" />

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >

                                                        Scan Out

                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        fontWeight={700}
                                                    >

                                                        {row.SCAN_OUT}

                                                    </Typography>

                                                </Stack>

                                            </CardContent>

                                        </Card>

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                flex: 1
                                            }}
                                        >

                                            <CardContent
                                                sx={{
                                                    py: 2
                                                }}
                                            >

                                                <Stack
                                                    spacing={1}
                                                    alignitems="center"
                                                >

                                                    <CheckCircleIcon color="primary" />

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >

                                                        Complete

                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        fontWeight={700}
                                                    >

                                                        {formatCompletion(

                                                            row.SCAN_IN,

                                                            row.SCAN_OUT

                                                        )}

                                                    </Typography>

                                                </Stack>

                                            </CardContent>

                                        </Card>

                                    </Stack>

                                    <Button

                                        variant="contained"
                                        startIcon={<VisibilityOutlinedIcon />}
                                        fullWidth
                                        onClick={() =>

                                            onDetail(row)

                                        }

                                    >

                                        Detail

                                    </Button>

                                </Stack>

                            </CardContent>

                        </Card>

                    ))

                }

            </Stack>

        </Box>

    );

}

export default AttendanceHistoryList;