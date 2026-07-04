import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
    return (
        <div className="layout">

            <Header />

            <div className="layout-body">

                <Sidebar />

                <main className="layout-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;