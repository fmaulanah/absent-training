import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function AttendanceHistoryTable({ rows, loading}) {

    
    const columns = [

        {
            field: "TRAINING_DATE",
            headerName: "Date",
            width: 120
        },

        {
            field: "TRAINING_NAME",
            headerName: "Training",
            minWidth: 250,
            flex: 1
        },

        {
            field: "TRAINER_NAME",
            headerName: "Trainer",
            width: 180
        },

        {
            field: "ROOM_NAME",
            headerName: "Room",
            width: 150
        },

        {
            field: "ABSENT_STATUS",
            headerName: "Status",
            width: 130,

            renderCell: ({ value }) => (

                <Chip

                    label={value ?? "-"}

                    color="default"

                    size="small"

                />

            )

        },

        {
            field: "SCAN_IN",

            headerName: "Scan In",

            width: 110,

            align: "center",

            headerAlign: "center"

        },

        {
            field: "SCAN_OUT",

            headerName: "Scan Out",

            width: 110,

            align: "center",

            headerAlign: "center"

        },

        {
            field: "completion",

            headerName: "Completion",

            width: 120,

            align: "center",

            headerAlign: "center"

        },

        {
            field: "action",

            headerName: "",

            width: 80,

            sortable: false,

            filterable: false,

            disableColumnMenu: true,

            align: "center",

            renderCell: () => (

                <IconButton

                    size="small"

                    disabled

                >

                    <VisibilityOutlinedIcon />

                </IconButton>

            )

        }

    ];

    return (

        <Card>

            <CardContent
                sx={{
                    p: {
                        xs: 2,
                        md: 3
                    }
                }}
            >

                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto"
                    }}
                >

                    <Box
                        sx={{
                            minWidth: 1250
                        }}
                    >

                        <DataGrid

                            rows={rows}
                            loading={loading}
                            columns={columns}
                            getRowId={(row) => row.SCHEDULE_ID}
                            autoHeight
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50]}
                            initialState={{

                                pagination: {

                                    paginationModel: {

                                        pageSize: 10

                                    }

                                }

                            }}

                        />

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default AttendanceHistoryTable;