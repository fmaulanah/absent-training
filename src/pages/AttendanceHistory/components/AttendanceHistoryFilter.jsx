import {
    Card,
    CardContent,
    Grid,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import AppButton from "../../../components/common/Button/AppButton";

function AttendanceHistoryFilter({

    filter,

    onFilterChange,

    onSearch,

    loading

}) {

    return (

        <Card
            sx={{
                // mb: 3
            }}
        >

            <CardContent
                sx={{
                    p: {
                        xs: 2,
                        md: 3
                    }
                }}
            >

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 6, sm: 6, lg: 2 }}>

                        <TextField
                            value={filter.fromDate}
                            fullWidth
                            type="date"
                            label="From Date"
                            onChange={(e) =>
                                onFilterChange("fromDate", e.target.value)
                            }
                            inputlabelprops={{
                                shrink: true
                            }}
                        />

                    </Grid>

                    <Grid size={{ xs: 6, sm: 6, lg: 2 }}>

                        <TextField
                            value={filter.toDate}
                            fullWidth
                            type="date"
                            label="To Date"
                            onChange={(e) =>
                                onFilterChange("toDate", e.target.value)
                            }
                            inputlabelprops={{
                                shrink: true
                            }}

                        />

                    </Grid>

                    {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                        <TextField
                            value={filter.training}
                            fullWidth
                            label="Training"
                            disabled
                        />

                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                        <TextField
                            value={filter.trainer}
                            fullWidth
                            label="Trainer"
                            disabled
                        />

                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                        <TextField
                            value={filter.status}
                            fullWidth
                            select
                            label="Status"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                            <MenuItem value="I">
                                Scan IN
                            </MenuItem>

                            <MenuItem value="O">
                                Scan OUT
                            </MenuItem>

                            <MenuItem value="F">
                                Finished
                            </MenuItem>

                        </TextField>

                    </Grid> */}

                    <Grid
                        size={{ xs: 12, lg: 6 }}
                        sx={{
                            mt:1
                        }}
                    >

                        <Stack
                            justifycontent="flex-end"
                            alignitems={{
                                xs: "stretch",
                                lg: "flex-end"
                            }}
                            height="100%"
                        >

                            <AppButton
                                fullWidth
                                startIcon={<SearchIcon />}
                                onClick={onSearch}
                                disabled={loading}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        lg: 110
                                    }
                                }}
                            >

                                Search

                            </AppButton>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}

export default AttendanceHistoryFilter;