import { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, MapPin } from "lucide-react";
import TambahDestinasiModal from "./TambahDestinasi";

const Destinasi = () => {

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [notif, setNotif] = useState(null);

    const [destinasi, setDestinasi] = useState(() => {

        const saved = localStorage.getItem("destinasi");

        if (saved) {
            return JSON.parse(saved);
        }

        return [
            {
                id: 1,
                nama: "Gunung Bromo",
                kategori: "Gunung",
                harga: "Rp50.000",
                lokasi: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
                image: "https://source.unsplash.com/50x50/?bromo"
            },
            {
                id: 2,
                nama: "Pantai Kuta",
                kategori: "Pantai",
                harga: "Gratis",
                lokasi: "Kuta, Kabupaten Badung, Bali",
                image: "https://source.unsplash.com/50x50/?beach"
            },
            {
                id: 3,
                nama: "Taman Safari Indonesia",
                kategori: "Wisata Buatan",
                harga: "Rp150.000",
                lokasi: "Bogor, Jawa Barat",
                image: "https://source.unsplash.com/50x50/?safari"
            },
        ];

    });

    const showNotif = (message, type = "success") => {

        setNotif({ message, type });

        setTimeout(() => {
            setNotif(null);
        }, 2500);
    };

    const handleDelete = (id) => {

        const item = destinasi.find(d => d.id === id);

        const confirmDelete = confirm("Yakin ingin menghapus destinasi ini?");
        if (!confirmDelete) return;

        setDestinasi((prev) => prev.filter((item) => item.id !== id));

        saveActivity(`Destinasi dihapus ${item.nama}`);
        showNotif(`Destinasi ${item.nama} berhasil dihapus`, "delete");
    };

    const handleEdit = (item) => {
        setEditData(item);
        setShowModal(true);
        // ❌ notif edit DIHAPUS dari sini (karena belum submit)
    };

    /* =========================
       SYNC KE LOCALSTORAGE
    ========================= */

    useEffect(() => {
        localStorage.setItem("destinasi", JSON.stringify(destinasi));
    }, [destinasi]);


    const kategoriColor = (kategori) => {
        if (kategori === "Gunung") return "bg-orange-100 text-orange-600";
        if (kategori === "Pantai") return "bg-blue-100 text-blue-600";
        return "bg-green-100 text-green-600";
    };

    const filtered = destinasi.filter((item) =>
        item.nama?.toLowerCase().includes(search.toLowerCase())
    );

    const saveActivity = (title) => {

        const saved = JSON.parse(localStorage.getItem("aktivitas")) || [];

        const newActivity = {
            title,
            time: "Baru saja",
            date: Date.now()
        };

        const updated = [newActivity, ...saved].slice(0, 10);

        localStorage.setItem("aktivitas", JSON.stringify(updated));
    };

    return (

        <div
            className="
            flex flex-col
            min-h-screen
            bg-[#d7e8fe]
            w-full
            xl:ml-72
            xl:w-[calc(100%-18rem)]
            transition-all duration-300
            "
        >

            <div
                className="
    flex-1
    max-w-[1600px]
    mx-auto
    px-4
    sm:px-6
    lg:px-10
    py-6
    sm:py-8
    "
            >

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            Data Destinasi
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Kelola semua data destinasi wisata
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
                        Tambah Destinasi
                    </button>

                </div>

                {/* CARD */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">

                    {/* SEARCH */}
                    <div className="relative w-full sm:max-w-sm mb-6">

                        <Search
                            size={18}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Cari destinasi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                            w-full
                            border
                            border-gray-200
                            rounded-lg
                            pl-10 pr-4 py-2
                            text-sm
                            focus:ring-2
                            focus:ring-blue-500
                            "
                        />

                    </div>

                    {/* MOBILE CARD */}
                    <div className="grid gap-4 md:hidden">

                        {filtered.slice(0, 6).map((item) => (
                            <div key={item.id} className="border rounded-xl p-4 bg-gray-50">

                                <div className="flex items-center gap-3 mb-3">

                                    <img
                                        src={item.image}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />

                                    <div>

                                        <p className="font-semibold">{item.nama}</p>

                                        <span className={`px-2 py-1 text-xs rounded-full ${kategoriColor(item.kategori)}`}>
                                            {item.kategori}
                                        </span>

                                    </div>

                                </div>

                                <p className="text-sm mb-2">{item.harga}</p>

                                <div className="flex justify-between items-center">

                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <MapPin size={14} />
                                        {item.lokasi}
                                    </div>

                                    <div className="flex gap-2">

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

                            </div>
                        ))}

                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="text-left px-4 py-3 w-16">ID</th>
                                    <th className="text-left px-4 py-3">Nama</th>
                                    <th className="text-left px-4 py-3">Kategori</th>
                                    <th className="text-left px-4 py-3 w-28">Harga</th>
                                    <th className="text-left px-4 py-3">Lokasi</th>
                                    <th className="text-right px-4 py-3 w-28">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((item) => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50 transition">

                                        <td className="px-4 py-4">{item.id}</td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <span className="font-medium">{item.nama}</span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${kategoriColor(item.kategori)}`}>
                                                {item.kategori}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">{item.harga}</td>

                                        <td className="px-4 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} />
                                                {item.lokasi}
                                            </div>
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
                <div
                    className={`
                    fixed top-5 right-5 z-50
                    px-4 py-3 rounded-xl shadow-lg text-white
                    transition-all duration-300
                    ${notif.type === "success" && "bg-green-500"}
                    ${notif.type === "edit" && "bg-blue-500"}
                    ${notif.type === "delete" && "bg-red-500"}
                    `}
                >
                    {notif.message}
                </div>
            )}

            {/* MODAL */}
            <TambahDestinasiModal
                open={showModal}
                editData={editData}
                onClose={() => setShowModal(false)}
                onSubmit={(data) => {

                    if (editData) {

                        setDestinasi((prev) =>
                            prev.map((item) =>
                                item.id === editData.id
                                    ? { ...item, ...data }
                                    : item
                            )
                        );

                        saveActivity(`Destinasi diperbarui ${data.nama}`);
                        showNotif(`Destinasi ${data.nama} berhasil diperbarui`, "edit");

                        setEditData(null);

                    } else {

                        setDestinasi((prev) => [
                            ...prev,
                            {
                                id: prev.length + 1,
                                ...data,
                            },
                        ]);

                        saveActivity(`Destinasi baru ditambahkan ${data.nama}`);
                        showNotif(`Destinasi ${data.nama} berhasil ditambahkan`, "success");
                    }
                }}
            />

        </div>

    );

};

export default Destinasi;