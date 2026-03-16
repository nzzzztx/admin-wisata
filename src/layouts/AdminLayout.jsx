import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* CONTENT */}
            <div className="flex-1">

                {/* HEADER MOBILE */}
                <div className="lg:hidden flex items-center p-4 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1e3a8a]">

                    <button onClick={() => setOpen(true)}>
                        <Menu size={24} color="white" />
                    </button>

                    <h1 className="ml-4 font-semibold text-white">
                        BrebesGO Admin
                    </h1>

                </div>

                {/* ROUTE PAGE */}
                <Outlet />

            </div>

        </div>
    );
};

export default AdminLayout;