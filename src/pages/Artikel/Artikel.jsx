import { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import TambahArtikel from "./TambahArtikel";

const Artikel = () => {

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [notif, setNotif] = useState(null);

    const [artikel, setArtikel] = useState(() => {

        const saved = localStorage.getItem("artikel");

        if (saved) return JSON.parse(saved);

        return [
            {
                id: 1,
                judul: "Kebun Teh Kaligua",
                kategori: "Wisata Alam",
                penulis: "Admin",
                image: "https://source.unsplash.com/50x50/?tea",
                tanggal: "2025-01-01"
            }
        ];
    });

    const showNotif = (message, type = "success") => {
        setNotif({ message, type });
        setTimeout(() => setNotif(null), 2500);
    };

    const saveActivity = (title) => {
        const saved = JSON.parse(localStorage.getItem("aktivitas")) || [];

        const newActivity = {
            title,
            time: "Baru saja",
            date: Date.now()
        };

        localStorage.setItem("aktivitas", JSON.stringify([newActivity, ...saved]));
    };

    const handleDelete = (id) => {
        const item = artikel.find(a => a.id === id);

        if (!confirm("Yakin hapus artikel?")) return;

        setArtikel(prev => prev.filter(a => a.id !== id));

        saveActivity(`Artikel dihapus ${item.judul}`);
        showNotif(`Artikel ${item.judul} dihapus`, "delete");
    };

    const handleEdit = (item) => {
        setEditData(item);
        setShowModal(true);
    };

    useEffect(() => {
        localStorage.setItem("artikel", JSON.stringify(artikel));
    }, [artikel]);

    const filtered = artikel.filter(a =>
        a.judul.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#d7e8fe] xl:ml-72 xl:w-[calc(100%-18rem)]">

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            Data Artikel
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Kelola artikel wisata
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditData(null);
                            setShowModal(true);
                        }}
                        className="
                        flex items-center justify-center gap-2
                        bg-blue-600 hover:bg-blue-700
                        text-white
                        px-4 py-2
                        rounded-xl
                        shadow
                        transition
                        w-full sm:w-auto
                        "
                    >
                        <Plus size={16} />
                        Tambah Artikel
                    </button>

                </div>

                {/* CARD */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">

                    {/* SEARCH */}
                    <div className="relative w-full sm:max-w-sm mb-6">
                        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari artikel..."
                            className="
                            w-full
                            border border-gray-200
                            rounded-lg
                            pl-10 pr-4 py-2
                            text-sm
                            focus:ring-2 focus:ring-blue-500
                            "
                        />
                    </div>

                    {/* MOBILE CARD */}
                    <div className="grid gap-4 md:hidden">

                        {filtered.map(item => (
                            <div key={item.id} className="border rounded-xl p-4 bg-gray-50">

                                <div className="flex items-center gap-3 mb-3">

                                    <img
                                        src={item.image}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold text-sm">
                                            {item.judul}
                                        </p>

                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                            {item.kategori}
                                        </span>
                                    </div>

                                </div>

                                <p className="text-xs text-gray-500 mb-2">
                                    {item.penulis} • {item.tanggal}
                                </p>

                                <div className="flex justify-end gap-2">

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="text-left px-4 py-3">ID</th>
                                    <th className="text-left px-4 py-3">Judul</th>
                                    <th className="text-left px-4 py-3">Kategori</th>
                                    <th className="text-left px-4 py-3">Penulis</th>
                                    <th className="text-left px-4 py-3">Tanggal</th>
                                    <th className="text-right px-4 py-3">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filtered.map(item => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50 transition">

                                        <td className="px-4 py-4">{item.id}</td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={item.image}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />

                                                <div className="font-medium">
                                                    {item.judul}
                                                </div>

                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                                                {item.kategori}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">{item.penulis}</td>

                                        <td className="px-4 py-4 text-gray-500">
                                            {item.tanggal}
                                        </td>

                                        <td className="px-4 py-4 text-right">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* NOTIF */}
            {notif && (
                <div className={`
                    fixed top-5 right-5 z-50
                    px-4 py-3 rounded-xl shadow-lg text-white
                    transition-all duration-300
                    ${notif.type === "success" && "bg-green-500"}
                    ${notif.type === "edit" && "bg-blue-500"}
                    ${notif.type === "delete" && "bg-red-500"}
                `}>
                    {notif.message}
                </div>
            )}

            {/* MODAL */}
            <TambahArtikel
                open={showModal}
                editData={editData}
                onClose={() => setShowModal(false)}
                onSubmit={(data) => {

                    if (editData) {

                        setArtikel(prev =>
                            prev.map(a =>
                                a.id === editData.id ? { ...a, ...data } : a
                            )
                        );

                        saveActivity(`Artikel diperbarui ${data.judul}`);
                        showNotif(`Artikel diupdate`, "edit");

                        setEditData(null);

                    } else {

                        setArtikel(prev => [
                            ...prev,
                            { id: prev.length + 1, ...data }
                        ]);

                        saveActivity(`Artikel ditambahkan ${data.judul}`);
                        showNotif(`Artikel ditambahkan`, "success");
                    }
                }}
            />

        </div>
    );
};

export default Artikel;