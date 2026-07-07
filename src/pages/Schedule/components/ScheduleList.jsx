import dayjs from "dayjs";

import { Box, Chip, Stack, Typography } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AppCard from "../../../components/common/Card/AppCard";

function ScheduleList({ trainings, roomMap, onSelectTraining }) 
{

    if (!trainings.length) {

        return (

            <Box
                sx={{
                    p:4,
                    textAlign:"center"
                }}
            >

                <Typography color="text.secondary">

                    Belum ada training.

                </Typography>

            </Box>

        );

    }

    return (

        <Stack
            spacing={2}
            sx={{
                width: "100%"
            }}
        >

            {trainings.map(training => (

                <AppCard
                    key={training.id}
                    sx={{
                        width:"100%",
                        cursor:"pointer",
                        "&:hover": {

                            boxShadow: 6
                        }
                    }}
                >

                    <Box

                        onClick={()=>onSelectTraining(training)}

                        sx={{

                            display:"flex",

                            justifyContent:"space-between",

                            alignItems:"flex-start"

                        }}

                    >

                        <Box 
                            sx={{
                                flex:1
                            }}
                        >

                            <Typography

                                variant="subtitle1"

                                fontWeight={700}

                            >

                                {training.title}

                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1
                                }}
                            >

                                <CalendarMonthIcon fontSize="small"/>

                                <Typography variant="body2">

                                    {dayjs(training.startDate).format("DD MMM YYYY")}

                                </Typography>

                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1
                                }}
                            >

                                <PersonIcon fontSize="small"/>

                                <Typography variant="body2">

                                    {training.trainerName}

                                </Typography>

                            </Box>

                            <Chip

                                label={

                                    roomMap[training.room] ??

                                    training.room

                                }

                                size="small"

                                color="primary"

                                variant="outlined"

                                sx={{

                                    mt:2

                                }}

                            />

                        </Box>

                        <ChevronRightIcon

                            color="action"

                        />

                    </Box>

                </AppCard>

            ))}

        </Stack>

    );

}

export default ScheduleList;