import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    MapPin,
    FileText,
    Users,
    Settings,
    LogOut
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
     ${isActive
            ? "bg-white/20 text-white"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <>
            {/* OVERLAY MOBILE */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
        fixed top-0 left-0 h-screen w-72 z-50
        flex flex-col
        p-6
        text-white
        bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#1e3a8a]

        transform transition-transform duration-300 ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        `}
            >

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                        Brebsel<span className="text-blue-400">GO</span>
                    </h1>

                    <p className="text-xs text-gray-400 mt-1">
                        Admin Panel
                    </p>

                </div>


                {/* MENU */}
                <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">

                    <NavLink
                        to="/dashboard"
                        className={menuClass}
                        onClick={() => setOpen(false)}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/destinasi"
                        className={menuClass}
                        onClick={() => setOpen(false)}
                    >
                        <MapPin size={18} />
                        Data Destinasi
                    </NavLink>


                    <NavLink
                        to="/artikel"
                        className={menuClass}
                        onClick={() => setOpen(false)}
                    >
                        <FileText size={18} />
                        Artikel
                    </NavLink>


                    <NavLink
                        to="/pengguna"
                        className={menuClass}
                        onClick={() => setOpen(false)}
                    >
                        <Users size={18} />
                        Pengguna
                    </NavLink>


                    <NavLink
                        to="/pengaturan"
                        className={menuClass}
                        onClick={() => setOpen(false)}
                    >
                        <Settings size={18} />
                        Pengaturan
                    </NavLink>

                </nav>


                {/* LOGOUT */}
                <div className="pt-6 border-t border-white/10">

                    <button
                        className="
            flex items-center gap-2
            text-sm text-gray-400
            hover:text-white
            transition
            "
                    >
                        <LogOut size={16} />
                        Logout
                    </button>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;