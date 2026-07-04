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

            <div className="sidebar-menu">

               

            </div>

            <div className="sidebar-footer">

                
            </div>

        </aside>

    );

}

export default Sidebar;