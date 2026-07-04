import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SettingsIcon from "@mui/icons-material/Settings";

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
        title: "Room",
        icon: MeetingRoomIcon,
        path: "/room"
    },
    {
        id: 4,
        title: "Setting",
        icon: SettingsIcon,
        path: "/setting"
    }
];