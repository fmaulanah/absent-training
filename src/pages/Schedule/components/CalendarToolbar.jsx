import { Box, IconButton, MenuItem, TextField, Typography } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";

import AppButton from "../../../components/common/Button/AppButton";
import useResponsive from "../../../hooks/useResponsive";

import dayjs from "dayjs";

function CalendarToolbar({ month, MONTHS, YEARS, setMonth, onAddTraining, onRefresh }) 
{
    const { isMobile } = useResponsive();

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2
            }}
        >

            {isMobile ? (

                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <IconButton
                            onClick={() =>
                                setMonth(current =>
                                    current.subtract(1, "month")
                                )
                            }
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <AppButton
                            variant="outlined"
                            sx={{
                                boxShadow: "none",
                                width: 220
                            }}
                            // onClick={() =>
                            //     setMonth(dayjs().startOf("month"))
                            // }
                        >
                            {MONTHS[month.month()]} {month.year()}
                        </AppButton>

                        <IconButton
                            onClick={() =>
                                setMonth(current =>
                                    current.add(1, "month")
                                )
                            }
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>

                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                    >
                        <AppButton
                            startIcon={<AddIcon />}
                            onClick={onAddTraining}
                            sx={{
                                boxShadow: "none",
                                width: 170
                            }}
                        >
                            Tambah Training
                        </AppButton>
                    </Box>
                </>

            ) : (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1
                    }}
                >

                    <TextField
                        select
                        size="small"
                        label="Bulan"
                        value={month.month()}
                        onChange={(event) =>
                            setMonth(current =>
                                current
                                    .month(Number(event.target.value))
                                    .startOf("month")
                            )
                        }
                        sx={{ minWidth: 130 }}
                    >
                        {MONTHS.map((monthName, index) => (
                            <MenuItem
                                key={monthName}
                                value={index}
                            >
                                {monthName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        size="small"
                        label="Tahun"
                        value={month.year()}
                        onChange={(event) =>
                            setMonth(current =>
                                current
                                    .year(Number(event.target.value))
                                    .startOf("month")
                            )
                        }
                        sx={{ minWidth: 100 }}
                    >
                        {YEARS.map((year) => (
                            <MenuItem
                                key={year}
                                value={year}
                            >
                                {year}
                            </MenuItem>
                        ))}
                    </TextField>

                    <IconButton
                        onClick={() =>
                            setMonth(current =>
                                current.subtract(1, "month")
                            )
                        }
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <AppButton
                        variant="outlined"
                        sx={{
                            boxShadow: "none"
                        }}
                        onClick={() =>
                            setMonth(dayjs().startOf("month"))
                        }
                    >
                        Hari Ini
                    </AppButton>

                    <IconButton
                        onClick={() =>
                            setMonth(current =>
                                current.add(1, "month")
                            )
                        }
                    >
                        <ChevronRightIcon />
                    </IconButton>

                    <AppButton
                        variant="outlined"
                        onClick={onRefresh}
                        sx={{
                            minWidth: 40,
                            width: 40,
                            height: 40,
                            p: 0,
                            boxShadow: "none"
                        }}
                    >
                        <RefreshIcon />
                    </AppButton>

                    <AppButton
                        startIcon={<AddIcon />}
                        onClick={onAddTraining}
                    >
                        Tambah Training
                    </AppButton>

                </Box>

            )}

        </Box>

    );

}

export default CalendarToolbar;