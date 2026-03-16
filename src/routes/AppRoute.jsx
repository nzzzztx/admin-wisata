import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/Dashboard";
import Destinasi from "../pages/Destinasi";

const AppRoute = () => {
    return (
        <Routes>

            {/* LOGIN */}
            <Route path="/" element={<Login />} />

            {/* ADMIN */}
            <Route element={<AdminLayout />}>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/destinasi" element={<Destinasi />} />

            </Route>

        </Routes>
    );
};

export default AppRoute;