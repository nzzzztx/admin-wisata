import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { MapPin, MessageCircle, TrendingUp, Tag } from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Dashboard = () => {

    const [destinasi, setDestinasi] = useState([]);
    const navigate = useNavigate();
    const [artikel, setArtikel] = useState([]);

    useEffect(() => {

        const saved = localStorage.getItem("destinasi");

        if (saved) {
            setDestinasi(JSON.parse(saved));
        }

        const savedArtikel = localStorage.getItem("artikel");

        if (savedArtikel) {
            setArtikel(JSON.parse(savedArtikel));
        }

    }, []);

    const totalDestinasi = destinasi.length;

    const kategoriList = [...new Set(destinasi.map(d => d.kategori))];

    const totalKategori = kategoriList.length;

    const totalArtikel = artikel.length;

    const kategoriCount = destinasi.reduce((acc, item) => {

        if (!acc[item.kategori]) {
            acc[item.kategori] = 0;
        }

        acc[item.kategori]++;

        return acc;

    }, {});

    /* ======================
       DATA UNTUK CHART
    ====================== */

    const chartData = Object.keys(kategoriCount).map((kategori) => ({
        name: kategori,
        jumlah: kategoriCount[kategori]
    }));


    const stats = {
        destinasi: totalDestinasi,
        kategori: totalKategori,
        pengunjung: 45892,
        artikel: totalArtikel,
    };

    const aktivitasDestinasi = [...destinasi]
        .reverse()
        .slice(0, 4)
        .map((item) => ({
            title: `Destinasi baru ditambahkan ${item.nama}`,
            time: "Baru saja"
        }));

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
                        title="Total Artikel"
                        value={stats.artikel}
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
                            {aktivitasDestinasi.map((item, index) => (
                                <Activity
                                    key={index}
                                    title={item.title}
                                    time={item.time}
                                />
                            ))}
                        </div>

                    </div>


                    {/* GRAFIK DISTRIBUSI */}
                    <div className="bg-white p-6 rounded-2xl shadow">

                        <h2 className="font-semibold text-lg mb-6">
                            Distribusi Kategori Wisata
                        </h2>

                        <div className="w-full h-[250px]">

                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="jumlah"
                                        fill="#2563eb"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                        <button
                            onClick={() => navigate("/destinasi")}
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

                        <QuickCard
                            color="bg-blue-100"
                            text="Tambah Destinasi"
                            onClick={() => navigate("/destinasi?add=true")}
                        />

                        <QuickCard
                            color="bg-green-100"
                            text="Lihat Artikel"
                            onClick={() => navigate("/artikel")}
                        />

                        <QuickCard
                            color="bg-purple-100"
                            text="Lihat Statistik"
                            onClick={() => navigate("/statistik")}
                        />

                        <QuickCard
                            color="bg-orange-100"
                            text="Pengaturan"
                            onClick={() => navigate("/pengaturan")}
                        />

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



const Progress = ({ label, width, count }) => {
    return (
        <div className="mb-6">

            <div className="flex justify-between text-sm mb-2">
                <span>{label}</span>
                <span>{count} destinasi</span>
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



const QuickCard = ({ color, text, onClick }) => {
    return (
        <div
            onClick={onClick}
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