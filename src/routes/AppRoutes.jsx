import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/dashboard";
import Schedule from "../pages/Schedule/Schedule";
import Attendt from "../pages/Attendance/Attendance";
import AttendanceHist from "../pages/AttendanceHistory/AttendanceHistory"
import System from "../pages/System/System";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>

                        <Login />

                    </PublicRoute>
                }
            />

            <Route
                element={
                    <ProtectedRoute>

                        <MainLayout />

                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/schedule"
                    element={<Schedule />}
                />

                <Route
                    path="/attendant"
                    element={<Attendt />}
                />

                <Route
                    path="/attendancehistory"
                    element={<AttendanceHist />}
                />

                <Route
                    path="/system"
                    element={<System />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}

export default AppRoutes;
