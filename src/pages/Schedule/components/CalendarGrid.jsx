import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

function CalendarGrid({ month, calendarDays, trainings, holidaySet, onSelectTraining, onShowMore }) 
{

    const WEEKDAYS = [ "Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab" ];

    return (

        <Box
            sx={{
                p:2,
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))"
            }}
        >

            {WEEKDAYS.map((day) => (

                <Box
                    key={day}
                    sx={{
                        // py: 1.5,
                        textAlign: "center",
                        bgcolor: "grey.50",
                        borderBottom: 1,
                        borderColor: "divider"
                    }}
                >

                    <Typography
                        variant="body2"
                        fontWeight={700}
                    >

                        {day}

                    </Typography>

                </Box>

            ))}

            {calendarDays.map((day, index) => {

                const date = day ? month.date(day).format("YYYY-MM-DD") : null;

                const dayTrainings = trainings.filter(item => item.startDate === date);

                const visibleTrainings = dayTrainings.slice(0, 2);
                const hiddenCount = dayTrainings.length - visibleTrainings.length;

                const isToday = date === dayjs().format("YYYY-MM-DD");
                const isHoliday = holidaySet.has(date);

                return (

                    <Box
                        key={`${day ?? "empty"}-${index}`}
                        sx={{
                            minHeight: {
                                xs: 90,
                                // md: 125
                            },
                            p: 1,
                            borderRight: (index + 1) % 7 === 0 ? 0 : 1,
                            borderBottom: 1,
                            borderColor: "divider",
                            bgcolor: !day ? "grey.50" : isHoliday ? "#FFF5F5" : "background.paper"
                        }}
                    >

                        {day && (

                            <>

                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        mb: .5,
                                        display: "flex",
                                        alignitems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        bgcolor: isToday ? "primary.main" : "transparent",
                                        color: isToday ? "white" : isHoliday ? "error.main" : "text.primary"
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        fontWeight={ isToday || isHoliday ? 700 : 400 }
                                        color={ isToday ? "white" : isHoliday ? "error.main" : "text.primary" }
                                    >

                                        {day}

                                    </Typography>

                                </Box>

                                {visibleTrainings.map(training => (
                                    <Box
                                        key={training.id}
                                        onClick={() => onSelectTraining(training)}
                                        sx={{
                                            mb: 0.5,
                                            p: 0.75,
                                            borderRadius: 1,
                                            bgcolor: training.useYn === "Y" ? "primary.main" : "grey.500",
                                            color: "white",
                                            cursor: "pointer",
                                            "&:hover": {
                                                bgcolor: training.useYn === "Y" ? "primary.dark" : "grey.600"
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "block",
                                                fontWeight: 700
                                            }}
                                        >
                                            {training.title}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "block",
                                                opacity: .8
                                            }}
                                        >
                                            {training.trainerName}
                                        </Typography>
                                    </Box>

                                ))}

                                {hiddenCount > 0 && (

                                    <Typography
                                        variant="caption"
                                        onClick={() => { onShowMore(date, dayTrainings) }}
                                        sx={{
                                            display: "block",
                                            mt: .5,
                                            color: "primary.main",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            "&:hover": {
                                                textDecoration: "underline"
                                            }
                                        }}
                                    >

                                        +{hiddenCount} lainnya

                                    </Typography>

                                )}

                            </>

                        )}

                    </Box>

                );

            })}

        </Box>

    );

}

export default CalendarGrid;