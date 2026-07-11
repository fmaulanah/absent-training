import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
    Box
} from "@mui/material";


import PageHeader from "../../components/common/PageHeader/PageHeader";

import AttendanceHistoryFilter from "./components/AttendanceHistoryFilter";
import AttendanceHistoryToolbar from "./components/AttendanceHistoryToolbar.jsx";
import AttendanceHistoryTable from "./components/AttendanceHistoryTable";
import AttendanceHistoryList from "./components/AttendanceHistoryList";

import useResponsive from "../../hooks/useResponsive";

import attendanceHistoryService from "../../services/attendanceHistoryService";

function AttendanceHistory() {

    const { isMobile } = useResponsive();

    const [view, setView] = useState("table");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState({

        fromDate: dayjs().startOf("month").format("YYYY-MM-DD"),

        toDate: dayjs().format("YYYY-MM-DD"),

        training: "",

        trainer: "",

        status: ""

    });

    const loadHistory = async (currentFilter = filter) => {

        try {

            console.log(filter);
            setLoading(true);

            const result = await attendanceHistoryService.getHistory(currentFilter);

            setRows(result);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const handleSearch = () => {

        loadHistory(filter);

    };

    const handleFilterChange = (field, value) => {

        setFilter(current => ({

            ...current,

            [field]: value

        }));

    };

    useEffect(() => {

        setView( isMobile? "list" : "table" );

    }, [isMobile]);

    useEffect(() => {

        loadHistory(filter);

    }, []);

    return (

        <Box>

            <PageHeader

                title="Attendance History"

                subtitle="Melihat riwayat attendance setiap training."

            />

            <AttendanceHistoryFilter

                filter={filter}

                onFilterChange={handleFilterChange}

                onSearch={handleSearch}

                loading={loading}

            />

            <AttendanceHistoryToolbar

                view={view}

                onChange={setView}

            />

            {

                view === "table"

                    ? <AttendanceHistoryTable

                        rows={rows}

                        loading={loading}

                    />

                    : <AttendanceHistoryList

                        rows={rows}

                        loading={loading}

                    />

            }

        </Box>

    );

}

export default AttendanceHistory;