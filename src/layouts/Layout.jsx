import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {

    const [open, setOpen] = useState(false);

    return (

        <div className="flex min-h-screen overflow-x-hidden bg-[#d7e8fe]">

            {/* SIDEBAR */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* CONTENT AREA */}
            <div className="flex flex-col flex-1">

                {/* HEADER MOBILE */}
                <header
                    className="
          lg:hidden
          flex items-center
          px-4
          h-14
          text-white
          bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1e3a8a]
          shadow
          sticky
          top-0
          z-50
          "
                >

                    <button
                        onClick={() => setOpen(!open)}
                        className="
            p-2
            rounded-lg
            hover:bg-white/10
            transition
            "
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <h1 className="ml-3 font-semibold tracking-wide text-sm">
                        BrebselGO Admin
                    </h1>

                </header>


                {/* PAGE CONTENT */}
                <main className="flex-1 w-full">
                    {children}
                </main>

            </div>

        </div>

    );

};

export default Layout;