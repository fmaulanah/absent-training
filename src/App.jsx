import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
            </Route>

        </Routes>
    );
}

export default App;