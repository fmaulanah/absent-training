import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Typography
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";

import dayjs from "dayjs";

function DashboardUpcomingTable({ rows }) {

    return (

        <Card
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={2}
                >

                    Upcoming Training

                </Typography>

                {

                    rows.length === 0

                        ?

                        (

                            <Box
                                sx={{
                                    py: 4,
                                    textalign: "center"
                                }}
                            >

                                <Typography
                                    color="text.secondary"
                                >

                                    Tidak ada training mendatang.

                                </Typography>

                            </Box>

                        )

                        :

                        (

                            <List disablePadding>

                                {

                                    rows.slice(0, 5).map((row, index) => (

                                        <Box
                                            key={row.id}
                                        >

                                            <ListItem
                                                sx={{
                                                    alignItems: "flex-start",
                                                    py: 2
                                                }}
                                            >

                                                <ListItemAvatar>

                                                    <Avatar
                                                        sx={{
                                                            bgcolor: "primary.main"
                                                        }}
                                                    >

                                                        <CalendarMonthIcon />

                                                    </Avatar>

                                                </ListItemAvatar>

                                                <Box
                                                    sx={{
                                                        flex: 1
                                                    }}
                                                >

                                                    <Typography
                                                        fontWeight={600}
                                                    >

                                                        {row.title}

                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            mt: 0.5
                                                        }}
                                                    >

                                                        {dayjs(row.startDate).format("DD MMM YYYY")}

                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            mt: 1.5,
                                                            display: "flex",
                                                            gap: 1,
                                                            flexwrap: "wrap"
                                                        }}
                                                    >

                                                        <Chip
                                                            icon={<MeetingRoomIcon />}
                                                            label={row.roomName}
                                                            size="small"
                                                            variant="outlined"
                                                        />

                                                        <Chip
                                                            icon={<PersonIcon />}
                                                            label={row.trainerName}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />

                                                    </Box>

                                                </Box>

                                            </ListItem>

                                            {

                                                index !== Math.min(rows.length, 5) - 1 &&

                                                <Divider />

                                            }

                                        </Box>

                                    ))

                                }

                            </List>

                        )

                }

            </CardContent>

        </Card>

    );

}

export default DashboardUpcomingTable;