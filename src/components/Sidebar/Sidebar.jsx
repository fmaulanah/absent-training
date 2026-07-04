import "./Sidebar.css";

import Avatar from "../Avatar/Avatar";
import MenuItem from "../MenuItem/MenuItem";

import {
    FaHome,
    FaCalendarAlt,
    FaDoorOpen,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar(){

    const menus = [
        {
            id:1,
            title:"Home",
            icon:<FaHome />
        },
        {
            id:2,
            title:"Schedule",
            icon:<FaCalendarAlt />
        },
        {
            id:3,
            title:"Room",
            icon:<FaDoorOpen />
        },
        {
            id:4,
            title:"Setting",
            icon:<FaCog />
        },
        {
            id:5,
            title:"Test",
            icon:<FaCog />
        }
    ];

    return(

        <aside className="sidebar">

            <Avatar/>

            <div className="sidebar-menu">

                {menus.map((menu)=>(
                    <MenuItem
                        key={menu.id}
                        title={menu.title}
                        icon={menu.icon}
                    />
                ))}

            </div>

            <div className="sidebar-footer">

                <MenuItem
                    title="Logout"
                    icon={<FaSignOutAlt />}
                />

            </div>

        </aside>

    );

}

export default Sidebar;