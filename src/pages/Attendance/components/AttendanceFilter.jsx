import {
    Grid,
    MenuItem,
    TextField
} from "@mui/material";

import dayjs from "dayjs";

import RefreshIcon from "@mui/icons-material/Refresh";

import AppButton from "../../../components/common/Button/AppButton";
import AppCard from "../../../components/common/Card/AppCard";

function AttendanceFilter({

    month,
    year,
    training,
    trainings = [],
    onMonthChange,
    onYearChange,
    onTrainingChange,
    onRefresh

}) {

    console.log(trainings);

    const months = [

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];

    return (

        <AppCard>

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs:6, md:3 }}>

                    <TextField
                        select
                        fullWidth
                        label="Bulan"
                        value={month}
                        onChange={onMonthChange}
                    >

                        {months.map((item,index)=>(

                            <MenuItem
                                key={index}
                                value={index+1}
                            >

                                {item}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs:6, md:2 }}>

                    <TextField
                        fullWidth
                        select
                        label="Tahun"
                        value={year}
                        onChange={onYearChange}
                    >

                        {[2025,2026,2027].map(item=>(

                            <MenuItem
                                key={item}
                                value={item}
                            >

                                {item}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs:12, md:5 }}>

                    <TextField
                        select
                        fullWidth
                        label="Training"
                        value={training?.id ?? ""}
                        onChange={onTrainingChange}
                    >

                        {trainings.map(item=>(

                            <MenuItem
                                key={item.id}
                                value={item.id}
                            >

                                {`${dayjs(item.startDate).format("D MMMM")} - ${item.title}`}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                {/* <Grid size={{ xs:12, md:2}}>

                    <AppButton
                        fullWidth
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                        sx={{
                            mt:1
                        }}
                    >

                        Refresh

                    </AppButton>

                </Grid> */}

            </Grid>

        </AppCard>

    );

}

export default AttendanceFilter;