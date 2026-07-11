import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function AttendanceHistoryList({ rows, loading }) 
{

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

        <Stack spacing={2}>

            {

                rows.map(row => (

                    <Card key={row.id}>

                        <CardContent>

                            <Stack spacing={2}>

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                    >

                                        {row.trainingName}

                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >

                                        {row.trainingDate}

                                    </Typography>

                                </Box>

                                <Divider />

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography color="text.secondary">

                                        Trainer

                                    </Typography>

                                    <Typography>

                                        {row.trainerName}

                                    </Typography>

                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography color="text.secondary">

                                        Room

                                    </Typography>

                                    <Typography>

                                        {row.roomName}

                                    </Typography>

                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Typography color="text.secondary">

                                        Status

                                    </Typography>

                                    <Chip

                                        label={row.status}

                                        size="small"

                                    />

                                </Stack>

                                <Divider />

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography color="text.secondary">

                                        Scan In

                                    </Typography>

                                    <Typography fontWeight={600}>

                                        {row.scanIn}

                                    </Typography>

                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography color="text.secondary">

                                        Scan Out

                                    </Typography>

                                    <Typography fontWeight={600}>

                                        {row.scanOut}

                                    </Typography>

                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography color="text.secondary">

                                        Completion

                                    </Typography>

                                    <Typography fontWeight={600}>

                                        {row.completion}

                                    </Typography>

                                </Stack>

                                <Button
                                    variant="outlined"
                                    startIcon={<VisibilityOutlinedIcon />}
                                    disabled
                                    fullWidth
                                >

                                    Detail

                                </Button>

                            </Stack>

                        </CardContent>

                    </Card>

                ))

            }

        </Stack>

    );

}

export default AttendanceHistoryList;