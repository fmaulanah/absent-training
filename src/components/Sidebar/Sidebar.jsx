import { Box, Divider, List } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { MENUS } from "../../constants/menu";

import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import useLeaveGuard from "../../hooks/useLeaveGuard";

import attendanceQueue from "../../utils/attendanceQueue";

function Sidebar({ isMobile, onClose }) {

    const navigate = useNavigate();
    const location = useLocation();
    const leaveGuard = useLeaveGuard();

    const handleMenuClick = (path) => {

        console.log(location.pathname);

        if (

            location.pathname === "/attendant" &&
            attendanceQueue.getCount() > 0

        ) {

            leaveGuard.requestLeave(() => {

                attendanceQueue.clearQueue();

                navigate(path);

                if (isMobile) {

                    onClose();

                }

            });

            onClose();
            return;

        }

        navigate(path);
        onClose();

    };
    return(

        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                height:"100%"
            }}
        >

            <SidebarHeader/>

            <Divider/>

            <List>

                {MENUS.map((menu)=>(

                    <SidebarItem

                        key={menu.id}

                        title={menu.title}

                        icon={menu.icon}

                        selected={location.pathname===menu.path}

                        onClick={() => handleMenuClick(menu.path)}

                    />

                ))}

            </List>

            <SidebarFooter/>

            <ConfirmDialog

                open={leaveGuard.open}
                title="Attendance Belum Diupload"
                message={`Masih ada attendance "${attendanceQueue.getScheduleName()}" yang belum diupload.`}
                confirmText="Hapus"
                cancelText="Batal"
                confirmColor="error"
                onConfirm={leaveGuard.confirmLeave}
                onCancel={leaveGuard.cancelLeave}

            />

        </Box>

    );

}

export default Sidebar;