import StatCard from "../components/StatCard";
import { MapPin, MessageCircle, TrendingUp, Tag } from "lucide-react";

const Dashboard = () => {

    const stats = {
        destinasi: 9,
        kategori: 3,
        pengunjung: 45892,
        ulasan: 1247,
    };

    return (

        <div
            className="
        min-h-screen
        bg-[#d7e8fe]
        w-full
        lg:ml-72
        lg:w-[calc(100%-18rem)]
        transition-all duration-300
        "
        >

            <div
                className="
        max-w-[1600px]
        mx-auto
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12
        py-8
        "
            >

                {/* HEADER */}
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                    Dashboard
                </h1>

                <p className="text-gray-600 mb-8">
                    Selamat datang kembali, Admin BrebselGO
                </p>


                {/* STAT CARD */}
                <div
                    className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          mb-10
          "
                >

                    <StatCard
                        title="Total Destinasi"
                        value={stats.destinasi}
                        icon={<MapPin />}
                    />

                    <StatCard
                        title="Kategori"
                        value={stats.kategori}
                        icon={<Tag />}
                    />

                    <StatCard
                        title="Total Ulasan"
                        value={stats.ulasan}
                        icon={<MessageCircle />}
                    />

                    <StatCard
                        title="Pengunjung Situs"
                        value={stats.pengunjung}
                        icon={<TrendingUp />}
                    />

                </div>


                {/* SECTION */}
                <div
                    className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          mb-10
          "
                >

                    {/* AKTIVITAS */}
                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="font-semibold text-lg mb-6">
                            Aktivitas Terkini
                        </h2>

                        <div className="space-y-6">

                            <Activity
                                title="Destinasi baru ditambahkan Argo Wisata Kaligua"
                                time="2 jam lalu"
                            />

                            <Activity
                                title="Data diperbarui Ranto Canyon"
                                time="5 jam lalu"
                            />

                            <Activity
                                title="Artikel baru Waduk Penjalin"
                                time="1 hari lalu"
                            />

                            <Activity
                                title="Destinasi baru ditambahkan Telaga Ranjeng"
                                time="2 hari lalu"
                            />

                        </div>

                    </div>


                    {/* DISTRIBUSI */}
                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="font-semibold text-lg mb-6">
                            Distribusi Kategori
                        </h2>

                        <Progress label="Wisata Alam" width="66%" />
                        <Progress label="Kuliner" width="50%" />
                        <Progress label="Wisata Buatan" width="33%" />

                        <button
                            className="
              mt-8
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              transition
              "
                        >
                            Kelola Data Destinasi
                        </button>

                    </div>

                </div>


                {/* QUICK ACTION */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    <h2 className="font-semibold text-lg mb-6">
                        Quick Actions
                    </h2>

                    <div
                        className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-6
            "
                    >

                        <QuickCard color="bg-blue-100" text="Tambah Destinasi" />
                        <QuickCard color="bg-green-100" text="Lihat Ulasan" />
                        <QuickCard color="bg-purple-100" text="Lihat Statistik" />
                        <QuickCard color="bg-orange-100" text="Pengaturan" />

                    </div>

                </div>

            </div>

        </div>
    );
};



const Activity = ({ title, time }) => {
    return (
        <div className="flex items-start gap-4">

            <div className="w-9 h-9 bg-green-100 rounded-full"></div>

            <div>
                <p className="text-sm">{title}</p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>

        </div>
    );
};



const Progress = ({ label, width }) => {
    return (
        <div className="mb-6">

            <div className="flex justify-between text-sm mb-2">
                <span>{label}</span>
                <span>3 destinasi</span>
            </div>

            <div className="h-3 bg-gray-200 rounded-full">

                <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{ width }}
                />

            </div>

        </div>
    );
};



const QuickCard = ({ color, text }) => {
    return (
        <div
            className={`
      p-6
      ${color}
      rounded-xl
      hover:scale-105
      transition
      cursor-pointer
      text-center
      font-medium
      `}
        >
            {text}
        </div>
    );
};


export default Dashboard;