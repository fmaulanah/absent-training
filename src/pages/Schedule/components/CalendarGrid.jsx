import { Box, Chip, Typography } from "@mui/material";
import dayjs from "dayjs";

function CalendarGrid({

    month,
    calendarDays,
    trainings,
    holidaySet,
    onSelectTraining

}) {

    const WEEKDAYS = [
        "Min",
        "Sen",
        "Sel",
        "Rab",
        "Kam",
        "Jum",
        "Sab"
    ];

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))"
            }}
        >

            {WEEKDAYS.map((day) => (

                <Box
                    key={day}
                    sx={{
                        py: 1.5,
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

                const date = day
                    ? month.date(day).format("YYYY-MM-DD")
                    : null;

                const dayTrainings = trainings.filter(
                    item => item.date === date
                );

                const isToday =
                    date === dayjs().format("YYYY-MM-DD");

                const isHoliday =
                    holidaySet.has(date);

                return (

                    <Box
                        key={`${day ?? "empty"}-${index}`}
                        sx={{
                            minHeight: {
                                xs: 90,
                                md: 125
                            },
                            p: 1,
                            borderRight:
                                (index + 1) % 7 === 0
                                    ? 0
                                    : 1,
                            borderBottom: 1,
                            borderColor: "divider",
                            bgcolor:
                                !day
                                    ? "grey.50"
                                    : isHoliday
                                        ? "#FFF5F5"
                                        : "background.paper"
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
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        bgcolor: isToday
                                            ? "primary.main"
                                            : "transparent",
                                        color: isToday
                                            ? "white"
                                            : isHoliday
                                                ? "error.main"
                                                : "text.primary"
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        fontWeight={
                                            isToday || isHoliday
                                                ? 700
                                                : 400
                                        }
                                        color={
                                            isToday
                                                ? "white"
                                                : isHoliday
                                                    ? "error.main"
                                                    : "text.primary"
                                        }
                                    >

                                        {day}

                                    </Typography>

                                </Box>

                                {dayTrainings.map(training => (

                                    <Chip
                                        key={training.id}
                                        label={`${training.time} ${training.title}`}
                                        color="primary"
                                        size="small"
                                        clickable
                                        onClick={() =>
                                            onSelectTraining(training)
                                        }
                                        title={`${training.title} - ${training.room} - ${training.trainerName}`}
                                        sx={{
                                            width: "100%",
                                            mb: .5,
                                            justifyContent: "flex-start",
                                            "& .MuiChip-label": {
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }
                                        }}
                                    />

                                ))}

                            </>

                        )}

                    </Box>

                );

            })}

        </Box>

    );

}

export default CalendarGrid;