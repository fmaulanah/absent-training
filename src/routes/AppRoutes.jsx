import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/home" replace />}
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
                    path="/home"
                    element={<Home />}
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