import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const MENUS = [
    {
        id: 1,
        title: "Dashboard",
        icon: DashboardIcon,
        path: "/dashboard"
    },
    {
        id: 2,
        title: "Schedule",
        icon: CalendarMonthIcon,
        path: "/schedule"
    },
    {
        id: 3,
        title: "Attendance",
        icon: AssignmentOutlinedIcon,
        path: "/attendant"
    },
    {
        id: 4,
        title: "Attendance History",
        icon: HistoryEduIcon,
        path: "/attendancehistory"
    },
    {
        id: 5,
        title: "System",
        icon: SettingsIcon,
        path: "/system"
    }
];