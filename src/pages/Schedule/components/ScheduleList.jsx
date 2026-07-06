import dayjs from "dayjs";

import {

    Box,

    Chip,

    Stack,

    Typography

} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AppCard from "../../../components/common/Card/AppCard";

function ScheduleList({

    trainings,

    roomMap,

    onSelectTraining

}) {

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
            spacing={1}
            sx={{
                width: "100%"
            }}
        >

            {trainings.map(training => (

                <AppCard
                    key={training.id}
                    sx={{
                        p:2,
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

                            <Stack

                                direction="row"

                                spacing={1}

                                alignItems="center"

                                mt={1}

                            >

                                <CalendarMonthIcon fontSize="small"/>

                                <Typography variant="body2">

                                    {dayjs(training.date).format("DD MMM YYYY")}

                                </Typography>

                            </Stack>

                            <Stack

                                direction="row"

                                spacing={1}

                                alignItems="center"

                                mt={0.5}

                            >

                                <AccessTimeIcon fontSize="small"/>

                                <Typography variant="body2">

                                    {training.time}

                                </Typography>

                            </Stack>

                            <Stack

                                direction="row"

                                spacing={1}

                                alignItems="center"

                                mt={0.5}

                            >

                                <PersonIcon fontSize="small"/>

                                <Typography variant="body2">

                                    {training.trainerName}

                                </Typography>

                            </Stack>

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